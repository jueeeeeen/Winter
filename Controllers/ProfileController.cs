using Microsoft.AspNetCore.Mvc;

namespace Winter_Project.Controllers;
public class ProfileController : Controller
{
    // GET: /<controller>/
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Edit()
    {
        return View();
    }
}