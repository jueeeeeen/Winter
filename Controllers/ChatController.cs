using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 
using Microsoft.EntityFrameworkCore;
using Winter_Project.Services;
using System.Net.WebSockets;

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
        var token = Request.Cookies["token"];

        if (!Request.Query.ContainsKey("activity_id") ||
            !int.TryParse(Request.Query["activity_id"], out int activity_id) ||
            string.IsNullOrEmpty(token))
        {
            return Redirect("/activity");
        }

        var username = JwtHelper.DecodeJwt(token);

        bool isParticipant = _context.Activities
            .Where(a => a.Activity_id == activity_id)
            .SelectMany(a => a.Participants)
            .Any(p => p.Username == username && ( p.Role == "member" || p.Role == "host"));

        if (!isParticipant)
        {
            return Redirect("/activity");
        }

        var messages = _context.ChatMessages
        .Where(m => m.Activity_id == activity_id)
        .OrderBy(m => m.Timestamp)
        .ToList();

        return View(messages);
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