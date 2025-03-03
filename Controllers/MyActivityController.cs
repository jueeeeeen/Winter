using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Winter_Project.Models; 
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace Winter_Project.Controllers;
public class MyActivityController: Controller
{
    private readonly WinterContext _context;
    public MyActivityController(WinterContext context)
    {
        _context = context;
    }
    public IActionResult Index()
    {
        return View();
    }

   [HttpGet]
    public JsonResult GetActivities([FromQuery] string activityType, [FromQuery] int page)
    {
        var token = Request.Cookies["token"];
        Console.WriteLine($"Token: {token}");

        if (string.IsNullOrEmpty(token))
        { 
            Console.WriteLine("⚠️ Token is missing");
        }
        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        Console.WriteLine($"Decoded JWT: {jwtSecurityToken}");

        var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        Console.WriteLine($"Extracted Username: {username}");

        if (string.IsNullOrEmpty(username))
        {
            Console.WriteLine("⚠️ Username is null or empty!");
        }

        var page_size = 5;
        var filtered_activities = _context.Activities.AsQueryable();
  
        filtered_activities = filtered_activities.Where(a => a.Participants.Any(p => p.Username == username));

        var activitiesList = filtered_activities
            .Include(a => a.Participants)
            .ToList(); 

        if (activityType == "history"){
            activitiesList = activitiesList.Where(a =>
                    DateTime.Parse(a.Activity_time).Add(TimeSpan.Parse(a.Duration)) < DateTime.UtcNow.AddHours(7))
                .ToList();
        }
        else if (activityType == "upcoming"){
            activitiesList = activitiesList.Where(a =>
                    DateTime.Parse(a.Activity_time).Add(TimeSpan.Parse(a.Duration)) >= DateTime.UtcNow.AddHours(7))
                .ToList();
        }

        var result = activitiesList;
        var response = new 
        {
            username,
            Activities = result
                .Skip((page - 1) * page_size)
                .Take(page_size)
                .Select(a => new 
                {
                    a.Title,
                    a.Tags,
                    Activity_time = DateTime.Parse(a.Activity_time).ToString("ddd, dd MMM yyyy-HH:mm"),
                    Participants = a.Participants.Select(p => new
                    {
                        p.Username,
                        p.Role,
                        UserDetails = _context.Users
                            .Where(u => u.Username == p.Username)
                            .Select(u => new
                            {
                                u.Username,
                                u.FirstName,
                                u.LastName,
                                u.Gender
                            })
                            .FirstOrDefault()
                    }).ToList()
                })
                .ToList(),
            Max_page = (result.Count() + 4) / 5
        };
        return Json(response);
    }
}