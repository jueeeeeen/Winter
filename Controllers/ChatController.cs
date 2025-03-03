using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 
using Microsoft.EntityFrameworkCore;
using Winter_Project.Services;
using System.Net.WebSockets;
using System.Text.RegularExpressions;
using Winter_Project.ViewModels;

[Route("chat")]
public class ChatController: Controller
{
    private readonly WebSocketHandler _webSocketHandler;
    private readonly WinterContext _context;

    public ChatController(WebSocketHandler webSocketHandler, WinterContext context)
    {
        _webSocketHandler = webSocketHandler;
        _context = context;
    }

    public IActionResult Index()
    {
        //check
        var token = Request.Cookies["token"];
        if (!Request.Query.ContainsKey("activity_id") ||
            !int.TryParse(Request.Query["activity_id"], out int activity_id) ||
            string.IsNullOrEmpty(token))
        {
            return Redirect("/activity");
        }

        var username = JwtHelper.DecodeJwt(token);

        var activity = _context.Activities
            .Where(a => a.Activity_id == activity_id)
            .Include(a => a.Participants)
            .FirstOrDefault();

        if (activity == null)
        {
            return Redirect($"/activitydetail/{activity_id}");
        }
        
        
        bool isParticipant = activity.Participants
            .Any(p => p.Username == username && (p.Role == "member" || p.Role == "host"));

        if (!isParticipant)
        {
            return Redirect($"/activitydetail/{activity_id}");
        }
        
        //data to send into View
        var activity_title = activity.Title;
        ViewData["activity_title"] = activity_title ?? "";

        var host_username = activity.Participants.FirstOrDefault(p => p.Role == "host")?.Username;
        ViewData["host"] = host_username ?? "";

        var messages = _context.ChatMessages
        .Where(m => m.Activity_id == activity_id)
        .OrderBy(m => m.Timestamp)
        .Join(
        _context.Users,
        message => message.Username,
        user => user.Username,
        (message, user) => new ChatMessageViewModel
        {
            Username = message.Username,
            First_name = user.FirstName,
            Last_name = user.LastName,
            Message = message.Message,
            Timestamp = message.Timestamp.ToString("dd MMM yyyy HH:mm"),  
        })
        .ToList();

        var activity_members = activity.Participants
            .Where(p => p.Role != "pending")
            .OrderBy(p => p.Join_time)
            .Join(
                _context.Users,
                p => p.Username,
                user => user.Username,
                (p, user) => new MemberViewModel
                {
                    Username = p.Username,
                    First_name = user.FirstName,
                    Last_name = user.LastName,
                    Role = p.Role
                })
            .ToList();

        var view_model = new ChatViewModel {
            Messages = messages,
            Group_member = activity_members
        };
        return View(view_model);
    }

    [HttpGet("connect")]
    public async Task<IActionResult> Connect()
    {
        try
        {
            if (!HttpContext.WebSockets.IsWebSocketRequest)
            {
                return BadRequest("WebSocket connection required");
            }
            
            var token = Request.Cookies["token"];
            if (!Request.Query.ContainsKey("activity_id") || 
            !int.TryParse(Request.Query["activity_id"], out int activity_id) ||
            string.IsNullOrEmpty(token))
            {
                return BadRequest("Missing or invalid activity_id");
            }

            var username = JwtHelper.DecodeJwt(token);
            var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            await _webSocketHandler.HandleConnectionAsync(webSocket, activity_id, username);
            return new EmptyResult();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return new EmptyResult();
        }
    }

}