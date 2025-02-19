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
        try
        {
            // สร้าง ActivityModel ใหม่
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
                Status = "Pending"
            };

            // สร้าง RequirementModel ใหม่และเชื่อมกับ Activity
            var requirement = new RequirementModel
            {
                Activity_id = activity.Activity_id, // กำหนด Foreign Key
                Gender = model.Requirement.Gender,
                Age = model.Requirement.Age,
                Other = model.Requirement.Other
            };

            // เพิ่ม Activity ลงในฐานข้อมูล
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            // เชื่อม Activity_id หลังจาก SaveChanges
            requirement.Activity_id = activity.Activity_id;
            _context.Requirements.Add(requirement);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Activity created successfully!" });
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
