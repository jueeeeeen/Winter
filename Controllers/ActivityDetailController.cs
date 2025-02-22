using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 
using Microsoft.EntityFrameworkCore;


public class ActivityDetailController: Controller
{
    private readonly WinterContext _context;

    public ActivityDetailController(ILogger<CreateController> logger, WinterContext context)
    {
        _context = context;
    }
    
    [HttpGet("ActivityDetail/{id}")] // URL pattern: /ActivityDetail/1
    public IActionResult Index(int id)
    {
        var activity = _context.Activities.FirstOrDefault(a => a.Activity_id == id);

        if (activity == null)
            return NotFound("Activity not found");

        ViewData["Activity"] = activity;
        return View();
    }

    [HttpPost("ActivityDetail/JoinActivity/{Activity_id}")]
    public IActionResult JoinActivity(int Activity_id)
    {
        var token = Request.Cookies["token"];
        var username = string.IsNullOrEmpty(token) ? "" : JwtHelper.DecodeJwt(token);

        var activity = _context.Activities.Include(a => a.Participants).FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }

        var member_count = activity.Participants.Count(p => p.Role == "member" || p.Role == "host");
        
        // เงื่อนไขพวกนี้ เช็คตั้งแต่ front เดี๋ยวลบทีหลัง
        if (activity.Owner.Contains(username)) return BadRequest(new { message = "User is an Owner." });
        if (activity.Participants.Any(p => p.Username == username)) {
            Console.WriteLine("User is already a participant.");
            return BadRequest(new { message = "User is already a participant." });}
        if (member_count >= activity.Max_member) return BadRequest(new { message = "Activity Full"});

        if (activity.Approval) {
            activity.Participants.Add(
                new ParticipantModel{
                    Username = username,
                    Role = "pending"
                }
            );
        }
        else {
            activity.Participants.Add(
                new ParticipantModel{
                    Username = username,
                    Role = "member"
                }
            );
        }

        if (member_count + 1 >= activity.Max_member) activity.Status = "full";

        _context.SaveChanges();

        return Ok(new { message = "Successfully Joined Activity"});
    }
}