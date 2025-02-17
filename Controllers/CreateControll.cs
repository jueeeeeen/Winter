using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models;

namespace Winter_Project.Controllers;

public class CreateController : Controller
{
    private readonly ILogger<CreateController> _logger;

    public CreateController(ILogger<CreateController> logger)
    {
        _logger = logger;
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
        using (var db = new WinterContext())
        {
            db.Add(user);
            db.SaveChanges();
        }
        
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
