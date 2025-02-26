using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 
using Winter_Project.ViewModels;

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
        var token = Request.Cookies["token"];
        if (string.IsNullOrEmpty(token)) return RedirectToAction("Login", "Account");

        try
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

            ViewData["Username"] = username;
            return View();
        }
        catch
        {
            return StatusCode(500, "Internal Server Error");
        }
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
                Console.WriteLine("no model");
                return BadRequest("i");
            }

            Console.WriteLine($"Received: {model.Title}, {model.Detail}, {model.Activity_time}");
            var activity = new ActivityModel
            {
                Owner = model.Owner,
                Title = model.Title,
                Detail = model.Detail,
                Create_time = DateTime.UtcNow.ToString("o"),
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
                Participants = {
                    new ParticipantModel {
                        Username = model.Owner,
                        Role = "host"
                    }
                },
                Status = "open"
            };
            
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();
            return Ok(new { activityId = activity.Activity_id });
        }
        catch (Exception ex)
    {

        return StatusCode(500, new 
        { 
            error = "Internal Server Error", 
            message = ex.Message,
            stackTrace = ex.StackTrace
        });
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
