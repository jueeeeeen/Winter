using Microsoft.AspNetCore.Mvc;

namespace Winter_Project.Controllers;
public class AccountController : Controller
{
    // GET: /<controller>/
    public IActionResult Login()
    {
        return View();
    }
    public IActionResult Register()
    {
        return View();
    }
}