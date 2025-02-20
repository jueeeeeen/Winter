using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 

public class ActivityDetailController: Controller
{
    private readonly WinterContext _context;

    public ActivityDetailController(ILogger<CreateController> logger, WinterContext context)
    {
        _context = context;
    }
    
    [HttpGet("ActivityDetail/{id}")] // URL pattern: /ActivityDetail/1
    public IActionResult Index(int id)
    {
        var activity = _context.Activities.FirstOrDefault(a => a.Activity_id == id);

        if (activity == null)
            return NotFound("Activity not found");

        ViewData["Activity"] = activity;
        return View();
    }
}