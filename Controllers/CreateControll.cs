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

    [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] ActivityModel model)
        {
            // Console.WriteLine($"Received Username: {model.Username}, Password: {model.Password} , Email: {model.Email} , FirstName: {model.FirstName}, LastName: {model.LastName} ,DateOfBirth: {model.DateOfBirth} ,Gender: {model.Gender}");
            try
            {

                var activity = new ActivityModel
                {
                    Owner = model.Owner,
                    Title = model.Title,
                    Detail = model.Detail,
                    Create_time = model.Create_time,
                    Activity_time = model.Activity_time, 
                    Duration = model.Duration,
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
                    Participants = new List<string>(), // แก้ไขให้เป็น List<T>
                    Status = "Test"
                };

                _context.Activities.Add(activity);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User registered successfully!" });
            }
            catch (Exception ex)
            {
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
