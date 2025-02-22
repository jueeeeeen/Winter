using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 

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

        var activity = _context.Activities.FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }
        
        if (activity.Owner.Contains(username))
        {
            return BadRequest(new { message = "User is an Owner." });
        }

        if (activity.Participants.Contains(username))
        {
            return BadRequest(new { message = "User is already a participant." });
        }

        if (activity.Participants.Count() >= activity.Max_member)
        {
            return BadRequest(new { message = "Activity Full"});
        }

        activity.Participants.Add(username);
        _context.SaveChanges();

        return Ok(new { message = "Successfully Joined Activity"});
    }
}