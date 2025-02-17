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

    public IActionResult Privacy()
    {
        return View();
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
