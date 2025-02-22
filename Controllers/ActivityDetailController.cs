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
    
    [HttpGet("ActivityDetail/{id}")]
    public IActionResult Index(int id)
    {
        var activity = _context.Activities
            .Where(a => a.Activity_id == id)
            .Select(a => new 
            {
                a.Activity_id,
                a.Title,
                a.Detail,
                a.Tags,
                a.Create_time,
                Requirement = a.Requirement != null ? new 
                {
                    a.Requirement.Gender,
                    a.Requirement.Age,
                    a.Requirement.Other
                } : null,
                a.Location,
                a.Activity_time,
                a.Max_member,
                Participants_count = a.Participants.Count(),
                a.Duration,
                host = _context.Users
                    .Where(u => u.Username == a.Owner)
                    .Select(u => new 
                    {
                        Profile_pic = "profile-g.png",
                        u.Username,
                        u.FirstName,
                        u.LastName,
                        u.Gender,
                        Review = "4.5"
                    })
                    .FirstOrDefault()
            })
            .FirstOrDefault();

    return activity == null ? NotFound("Activity not found") : View(activity);
    }

}