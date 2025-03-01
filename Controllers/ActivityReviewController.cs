using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;


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
        if (!ModelState.IsValid)
        {
            foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            {
                Console.WriteLine($"Error: {error.ErrorMessage}");
            }
            return BadRequest(ModelState);
        }
        Console.WriteLine($"Received Reviewer: {model.User_id}, Reviewed_user: {model.Reviewed_user}, Activity_id: {model.Activity_id}, Rating: {model.Rating}, Comment: {model.Comment}, Time: {DateTime.UtcNow.ToString("o")}");

        var review = new ReviewModel
        {
            User_id = model.User_id,
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
                                u.Id,
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
            r.User_id,
            r.Reviewed_user,
            r.Rating,
            r.Comment,
            r.Time,
            User = _context.Users
                .Where(u => u.Id == r.User_id)
                .Select(u => new
                {
                    u.FirstName,
                    u.LastName
                })
                .FirstOrDefault(),
            ReviewedUser = _context.Users
            .Where(u => u.Id == r.Reviewed_user)
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
}