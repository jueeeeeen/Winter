using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace Winter_Project.Controllers;
public class ActivityReviewController : Controller
{
    private readonly WinterContext _context;

    public ActivityReviewController(WinterContext context)
    {
        _context = context;
    }

    [HttpGet("Activity/Comment/{Activity_id}")]
    public IActionResult ShowCommentView()
    {
        return View("~/Views/Comment/Index.cshtml");
    }

    [HttpPost("Activity/Comment")]
    public async Task<IActionResult> SubmitReview([FromBody] ReviewModel model, [FromQuery] string reviewedUsername = null)
    {
        var token = Request.Cookies["token"];
        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { message = "Authentication required" });
        }

        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(username))
        {
            return Unauthorized(new { message = "Invalid token" });
        }

        var userName = await _context.Users
            .Where(u => u.Username == username)
            .Select(u => u.Username)
            .FirstOrDefaultAsync();

        model.Reviewer = userName;

        if (!ModelState.IsValid)
        {
            foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            {
                Console.WriteLine($"Error: {error.ErrorMessage}");
            }
            return BadRequest(ModelState);
        }

        Console.WriteLine($"Received Reviewer: {model.Reviewer}, Reviewed_user: {model.Reviewed_user}, Activity_id: {model.Activity_id}, Rating: {model.Rating}, Comment: {model.Comment}, Time: {DateTime.UtcNow.ToString("o")}");

        var review = new ReviewModel
        {
            Reviewer = model.Reviewer,
            Reviewed_user = model.Reviewed_user,
            Activity_id = model.Activity_id,
            Rating = model.Rating,
            Comment = model.Comment,
            Time = DateTime.UtcNow
        };

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Review submitted successfully." });
    }

    [HttpGet("Activity/Review/{Activity_id}")]
    public async Task<IActionResult> Index(int Activity_id)
    {
        Console.WriteLine($"Received activityId: {Activity_id}");

        var activityWithReviews = await _context.Activities
            .Where(a => a.Activity_id == Activity_id)
            .Select(a => new
            {
                a.Title,
                a.Max_member,
                Participants = a.Participants
                    .OrderBy(p => p.Role == "host" ? 0 : p.Role == "member" ? 1 : 2)
                    .ThenBy(p => p.Join_time)
                    .Select(p => new
                    {
                        p.Username,
                        User = _context.Users
                            .Where(u => u.Username == p.Username)
                            .Select(u => new
                            {
                                u.Username,
                                u.FirstName,
                                u.LastName
                            })
                            .FirstOrDefault()
                    }).ToList()
            })
            .FirstOrDefaultAsync();

        if (activityWithReviews == null)
        {
            Console.WriteLine("Activity not found!");
            return NotFound("Activity not found.");
        }

        var reviews = await _context.Reviews
        .Where(r => r.Activity_id == Activity_id)
        .Select(r => new
        {
            r.Reviewer,
            r.Reviewed_user,
            r.Rating,
            r.Comment,
            r.Time,
            User = _context.Users
                .Where(u => u.Username == r.Reviewer)
                .Select(u => new
                {
                    u.FirstName,
                    u.LastName
                })
                .FirstOrDefault(),
            ReviewedUser = _context.Users
            .Where(u => u.Username == r.Reviewed_user)
            .Select(u => new
            {
                u.FirstName,
                u.LastName
            })
            .FirstOrDefault()
        })
        .ToListAsync();

        ViewData["Activity"] = activityWithReviews;
        ViewData["Reviews"] = reviews;

        return View(activityWithReviews);
    }

    [HttpGet("Profile/Review")]
    public async Task<IActionResult> ShowProfileComment()
    {
        var token = Request.Cookies["token"];
        if (string.IsNullOrEmpty(token))
        {
            return RedirectToAction("Login", "Account");
        }

        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(username))
        {
            return RedirectToAction("Login", "Account");
        }

        var userId = await _context.Users
        .Where(u => u.Username == username)
        .Select(u => u.Username)
        .FirstOrDefaultAsync();

        var reviews = await _context.Reviews
        .Where(r => r.Reviewed_user == userId)
        .Select(r => new
        {
            r.Reviewer,
            r.Reviewed_user,
            r.Rating,
            r.Comment,
            r.Time,
            r.Activity_id,
            ActivityTitle = _context.Activities
                .Where(a => a.Activity_id == r.Activity_id)
                .Select(a => a.Title)
                .FirstOrDefault(),
            User = _context.Users
                .Where(u => u.Username == r.Reviewer)
                .Select(u => new
                {
                    u.FirstName,
                    u.LastName
                })
                .FirstOrDefault(),
            ReviewedUser = _context.Users
                .Where(u => u.Username == r.Reviewed_user)
                .Select(u => new
                {
                    u.FirstName,
                    u.LastName,
                    u.Username
                })
                .FirstOrDefault()
        })
        .ToListAsync();

        float averageRating = 0;

        if (reviews != null && reviews.Any())
        {
            var ratings = reviews.Select(r => r.Rating).ToList();
            if (ratings.Any()) {
                averageRating = ratings.Average(); 
            }
        }

        ViewData["AverageRating"] = averageRating;

        var reviewedUser = reviews?.FirstOrDefault()?.ReviewedUser;

        return View("~/Views/MyReview/Index.cshtml", new { Reviews = reviews, ReviewedUser = reviewedUser });
    }
}