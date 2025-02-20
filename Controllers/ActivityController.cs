using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Winter_Project.Models; 
using Winter_Project.ViewModels;

namespace Winter_Project.Controllers;
public class ActivityController: Controller
{
    private readonly WinterContext _context;

    public ActivityController(WinterContext context)
    {
        _context = context;
    }
    
    public IActionResult Index()
    {
        
        return View();
    }

    [HttpGet]
    public IActionResult Index(string search_string)
    {
        ViewBag.keyword = search_string;
        return View();
    }

    [HttpPost]
    public IActionResult Index([FromBody] string[] tags)
    {
        return Json(new { Tags = tags });
    }

    [HttpPost]
    public JsonResult GetActivityCards()
    {
        var activities = _context.Activities
                            .Select(a => new 
                            {
                                a.Activity_id,
                                a.Title,
                                a.Tags,
                                Create_time = DateTime.Parse(a.Create_time).ToString("dd MMM yyyy HH:mm"),
                                Requirement = new {
                                    a.Requirement.Gender,
                                    a.Requirement.Age,
                                },
                                a.Location,
                                Activity_time = @DateTime.Parse(a.Activity_time).ToString("ddd, dd MMM yyyy-HH:mm"),
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
                            .ToList();
        return Json(activities);
    }
}