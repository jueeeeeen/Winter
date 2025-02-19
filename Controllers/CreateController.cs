using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models;

namespace Winter_Project.Controllers;

public class CreateController : Controller
{
    private readonly ILogger<CreateController> _logger;
    private readonly WinterContext _context;

    public CreateController(ILogger<CreateController> logger, WinterContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] ActivityModel model)
    {
        
        try
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var rawBody = await reader.ReadToEndAsync();
                Console.WriteLine($"Raw Request Body: {rawBody}");
            }

            if (model == null)
            {
                return BadRequest("i");
            }

            Console.WriteLine($"Received: {model.Title}, {model.Detail}, {model.Activity_time}");
            var activity = new ActivityModel
            {
                Owner = "jueeeeeen",
                Title = model.Title,
                Detail = model.Detail,
                // Create_time = DateTime.UtcNow,
                Create_time = "15 Jan 2025 12:59",
                Activity_time = model.Activity_time, 
                Duration = "5",
                Location = model.Location,
                Max_member = model.Max_member,
                Approval = model.Approval,
                Tags = model.Tags,
                Requirement = new RequirementModel
                {
                    Gender = model.Requirement.Gender,
                    Age = model.Requirement.Age,
                    Other = model.Requirement.Other
                },
                Participants = new List<string>(),
                Status = "open"
            };

            
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return Ok(new { message = "activity created" });
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex.Message);
            return StatusCode(500, new { message = "Internal server error", details = ex.Message });
        }
    }

    public IActionResult AddUser()
    {
        return View();
    }

    [HttpPost]
    public IActionResult AddUser(UserModel user)
    {
        // ✅ ใช้ _context ที่ Inject มา
        _context.Add(user);
        _context.SaveChanges();
        
        return View();
    }
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
