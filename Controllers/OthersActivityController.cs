using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 
using Microsoft.EntityFrameworkCore;
public class OthersActivityController: Controller
{
    private readonly WinterContext _context;
    public OthersActivityController(WinterContext context)
    {
        _context = context;
    }
    [HttpGet("ActivityProfile/{username}")]
    public IActionResult Index(string username, [FromQuery] int page)
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
  
        filtered_activities = filtered_activities.Where(a => a.Participants.Any(p => p.Username == username));

        var activitiesList = filtered_activities
            .Include(a => a.Participants)
            .ToList(); 

        activitiesList = activitiesList.Where(a =>
            a.Activity_time.Add(TimeSpan.Parse(a.Duration)) < DateTime.UtcNow)
        .ToList();    

        // var averageRating = _context.Reviews
        //     .Where(r => r.Reviewed_user == username)
        //     .Average(r => r.Rating);

        var result = activitiesList;
        var response = new 
        {

            User = _context.Users
            .Where(u => u.Username == username)
            .Select(u => new
            {
                Profile_pic = u.ProfilePicture != null 
                    ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                    : "/assets/profile-g.png",
                u.Username,
                u.FirstName,
                u.LastName,
                u.Gender,
                Rating = 4.5
            })
            .FirstOrDefault(),
            Activities = result
                .Skip((page - 1) * page_size)
                .Take(page_size)
                .Select(a => new 
                {
                    a.Activity_id,
                    a.Title,
                    a.Tags,
                    a.Status,
                    Activity_time = a.Activity_time.ToString("ddd, dd MMM yyyy-HH:mm"),
                    Participants = a.Participants
                    .OrderBy(p => p.Role == "host" ? 0 : p.Role == "member" ? 1 : 2)
                    .Select(p => new
                    {
                        p.Username,
                        p.Role,
                        UserDetails = _context.Users
                            .Where(u => u.Username == p.Username)
                            .Select(u => new
                            {
                                Profile_pic = u.ProfilePicture != null 
                                    ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                    : "/assets/profile-g.png",
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
        return response == null ? NotFound("Activity not found") : View(response);
    }
}