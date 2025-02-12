using Microsoft.AspNetCore.Mvc;

namespace Winter_Project.Controllers;
public class UserController : Controller
{
    // GET: /<controller>/
    public IActionResult Profile()
    {
        return View();
    }

    public IActionResult Edit()
    {
        return View();
    }
}