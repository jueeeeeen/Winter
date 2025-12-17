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
    public async Task<IActionResult> SubmitReview([FromBody] ReviewModel model)
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

        // check existing review
        var existingReview = await _context.Reviews
            .Where(r => r.Reviewer == username && r.Activity_id == model.Activity_id && r.Reviewed_user == model.Reviewed_user)
            .FirstOrDefaultAsync();

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

        if (existingReview != null)
        {
            Console.WriteLine("Review already exists!");
            return BadRequest(new { message = "Review already exists!" });
        }
        else
        {
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
    }

    [HttpGet("Activity/HasReview")]
    public async Task<IActionResult> CheckReview([FromQuery] int activityId, [FromQuery] string reviewedUser)
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

        // ตรวจสอบว่ามีรีวิวอยู่แล้วหรือไม่
        var hasReview = await _context.Reviews
            .AnyAsync(r => r.Reviewer == username && r.Activity_id == activityId && r.Reviewed_user == reviewedUser);

        return Ok(new { hasReview });
    }



    [HttpGet("ActivityReview/{Activity_id}")]
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
                    u.LastName,
                    Profile_pic = u.ProfilePicture != null 
                                                        ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                                        : "/assets/profile-g.png"
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
        .OrderByDescending(r => r.Time)
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
                    u.LastName,
                    Profile_pic = u.ProfilePicture != null 
                                                        ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                                        : "/assets/profile-g.png"
                })
                .FirstOrDefault(),
            ReviewedUser = _context.Users
                .Where(u => u.Username == r.Reviewed_user)
                .Select(u => new
                {
                    u.FirstName,
                    u.LastName,
                    u.Username,
                    Profile_pic = u.ProfilePicture != null 
                                                        ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                                        : "/assets/profile-g.png"
                })
                .FirstOrDefault()
        })
        .ToListAsync();

        float averageRating = 0;

        if (reviews.Count > 0)
        {
            averageRating = (float)Math.Round(reviews.Average(r => r.Rating), 2);
        }

        var reviewedUser = reviews.FirstOrDefault()?.ReviewedUser ?? await _context.Users
            .Where(u => u.Username == userId)
            .Select(u => new
            {
                
                u.FirstName,
                u.LastName,
                u.Username,
                Profile_pic = u.ProfilePicture != null 
                                                        ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                                        : "/assets/profile-g.png"
            })
            .FirstOrDefaultAsync();

        ViewData["AverageRating"] = averageRating.ToString("F2");

        Console.WriteLine($"Review Count: {reviews?.Count}");

        return View("~/Views/MyReview/Index.cshtml", new { Reviews = reviews, ReviewedUser = reviewedUser });
    }

    [HttpGet("Profile/Review/{username}")]
    public async Task<IActionResult> ShowProfileCommentByUsername(string username)
    {
        var token = Request.Cookies["token"];
        if (string.IsNullOrEmpty(token))
        {
            return RedirectToAction("Login", "Account");
        }

        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var currentUser = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(currentUser))
        {
            return RedirectToAction("Login", "Account");
        }

        // ตรวจสอบว่า username ที่ระบุใน URL เป็นของผู้ใช้ที่มีอยู่จริง
        var userExists = await _context.Users
            .AnyAsync(u => u.Username == username);

        if (!userExists)
        {
            return NotFound("User not found");
        }

        var reviews = await _context.Reviews
            .Where(r => r.Reviewed_user == username)
            .OrderByDescending(r => r.Time)
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
                        u.LastName,
                        Profile_pic = u.ProfilePicture != null 
                                                            ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                                            : "/assets/profile-g.png"
                    })
                    .FirstOrDefault(),
                ReviewedUser = _context.Users
                    .Where(u => u.Username == r.Reviewed_user)
                    .Select(u => new
                    {
                        u.FirstName,
                        u.LastName,
                        u.Username,
                        Profile_pic = u.ProfilePicture != null 
                                                            ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                                            : "/assets/profile-g.png"
                    })
                    .FirstOrDefault()
            })
            .ToListAsync();

        float averageRating = 0;

        if (reviews.Count > 0)
        {
            averageRating = (float)Math.Round(reviews.Average(r => r.Rating), 2);
        }

        var reviewedUser = reviews.FirstOrDefault()?.ReviewedUser ?? await _context.Users
            .Where(u => u.Username == username)
            .Select(u => new
            {
                u.FirstName,
                u.LastName,
                u.Username,
                Profile_pic = u.ProfilePicture != null 
                                                            ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                                            : "/assets/profile-g.png"
            })
            .FirstOrDefaultAsync();

        ViewData["AverageRating"] = averageRating.ToString("F2");

        Console.WriteLine($"Review Count: {reviews?.Count}");

        return View("~/Views/MyReview/Index.cshtml", new { Reviews = reviews, ReviewedUser = reviewedUser });
    }

}