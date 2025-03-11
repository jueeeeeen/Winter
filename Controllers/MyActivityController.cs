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
    public JsonResult GetActivities([FromQuery] string activityType, [FromQuery] int page )
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

        var curusername = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        Console.WriteLine($"Extracted Username: {curusername}");

        if (string.IsNullOrEmpty(curusername))
        {
            Console.WriteLine("⚠️ Username is null or empty!");
        }

        var page_size = 5;
        var filtered_activities = _context.Activities.AsQueryable();

        filtered_activities = filtered_activities.Where(a => a.Participants.Any(p => p.Username == curusername));
        
        var activitiesList = filtered_activities
            .Include(a => a.Participants)
            .ToList(); 

        if (activityType == "history")
        {
            activitiesList = activitiesList.Where(a =>
                    a.Activity_time.Add(TimeSpan.Parse(a.Duration)) < DateTime.UtcNow.AddHours(7)
                    || a.Status == "done" 
                    || a.Status == "delete")
                    .OrderByDescending(a => a.Status == "done")
                    .ThenByDescending(a => a.Activity_time)   
                .ToList();
        }
        else if (activityType == "upcoming")
        {
            activitiesList = activitiesList.Where(a =>
                    a.Activity_time.Add(TimeSpan.Parse(a.Duration)) >= DateTime.UtcNow.AddHours(7)
                    && a.Status != "delete") 
                    .OrderByDescending(a => a.Activity_time)
                .ToList();
        }
        var result = activitiesList;
        var response = new 
        {
            curusername,
            Activities = result
                .Skip((page - 1) * page_size)
                .Take(page_size)
                .Select(a => new 
                {
                    EndTime = a.Activity_time.Add(TimeSpan.Parse(a.Duration)),     
                    now = DateTime.UtcNow.AddHours(7),
                    a.Activity_id,
                    a.Title,
                    a.Tags,
                    a.Status,
                    Activity_time = a.Activity_time.ToString("ddd, dd MMM yyyy-HH:mm"),
                    host = _context.Users
                    .Where(u => u.Username == a.Owner)
                    .Select(u => new 
                    {
                        u.Username,
                        u.FirstName,
                        u.LastName,
                        u.Gender,
                        Rating = "4.5"
                    })
                    .FirstOrDefault(),
                    Participants = a.Participants
                    .OrderBy(p => p.Role == "host" ? 0 : p.Role == "member" ? 1 : 2)
                    .Select(p => new
                    {
                        p.Role,
                        UserDetails = _context.Users
                            .Where(u => u.Username == p.Username)
                            .Select(u => new
                            {
                                Profile_pic = u.ProfilePicture != null 
                                    ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                    : "/assets/profile-g.png",
                                u.Id,
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
