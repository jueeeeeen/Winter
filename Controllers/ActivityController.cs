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
    public JsonResult GetActivityCards([FromBody] ActDisplayOptionModel filters)
    {
        Console.WriteLine(filters);
        var page_size = 12;

        var filtered_activities = _context.Activities.Where(a => a.Status == "open").AsQueryable();

        switch (filters.Sort)
        {
            case "Create_date":
                filtered_activities = filters.Descending
                    ? filtered_activities.OrderByDescending(a => a.Activity_id)
                    : filtered_activities.OrderBy(a => a.Activity_id);
                break;
            
            case "Activity_time":
                filtered_activities = filters.Descending
                    ? filtered_activities.OrderByDescending(a => a.Activity_time)
                    : filtered_activities.OrderBy(a => a.Activity_time);
                break;

            case "Participants":
                filtered_activities = filters.Descending
                    ? filtered_activities.OrderByDescending(a => a.Max_member)
                    : filtered_activities.OrderBy(a => a.Max_member);
                break;

            case "Popular":
                filtered_activities = filters.Descending
                    ? filtered_activities.OrderByDescending(a => a.Participants.Count())
                    : filtered_activities.OrderBy(a => a.Participants.Count());
                break;

            default:
                filtered_activities = filtered_activities.OrderBy(a => a.Activity_id);
                break;
        }

        if (filters.Filter.Gender != null && filters.Filter.Gender.Any()) {
            filtered_activities = filtered_activities.Where(a => filters.Filter.Gender.Contains(a.Requirement.Gender));
        }

        if (filters.Filter.Age != null) {
            filtered_activities = filtered_activities.Where(a => a.Requirement.Age >= filters.Filter.Age.Min && a.Requirement.Age <= filters.Filter.Age.Max);
        }

        // if (filters.Filter.Friend == true) {
        //     filtered_activities = filtered_activities.Where(a => a.Owner);
        // }

        if (filters.Tag_filter.Any()) {
            filtered_activities = filtered_activities.Where(a => filters.Tag_filter.Any(tag => a.Tags.Contains(tag)));
        }

        if (filters.Seach_key != null) {
            filtered_activities = filtered_activities.Where(a => a.Title.Contains(filters.Seach_key));
        }

        var response = new 
        {
            Activities = filtered_activities
                .Skip((filters.Page - 1) * page_size)
                .Take(page_size)
                .Select(a => new 
                {
                    a.Activity_id,
                    a.Title,
                    a.Tags,
                    Create_time = a.Create_time.ToLocalTime().ToString("ddd, dd MMM yyyy HH:mm"),
                    Requirement = new {
                        a.Requirement.Gender,
                        a.Requirement.Age,
                    },
                    a.Location,
                    Activity_time = a.Activity_time.ToLocalTime().ToString("ddd, dd MMM yyyy-HH:mm"),
                    a.Max_member,
                    Member_count = a.Participants.Count(p => p.Role == "member" || p.Role == "host"),
                    a.Duration,
                    host = _context.Users
                                    .Where(u => u.Username == a.Owner)
                                    .Select(u => new 
                                    {
                                        Profile_pic = u.ProfilePicture != null 
                                                        ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                                        : "/assets/profile-g.png",
                                        u.Username,
                                        u.FirstName,
                                        u.LastName,
                                        u.Gender,
                                        Review = "4.5"
                                    })
                                    .FirstOrDefault()
                })
                .ToList(),
            Max_page = (filtered_activities.Count() + 11) / 12
        };
        return Json(response);
    }
}