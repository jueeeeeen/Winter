using Microsoft.AspNetCore.Mvc;

namespace Winter_Project.Controllers;
public class AccountController : Controller
{
    // GET: /<controller>/
    public IActionResult Login()
    {
        return View();
    }
    public IActionResult RegisterUser()
    {
        return View();
    }
    public IActionResult RegisterDetail()
    {
        return View();
    }
}