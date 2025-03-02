using Microsoft.AspNetCore.Mvc;

namespace Winter_Project.Controllers;
public class ActivityReview: Controller
{
    public IActionResult Index()
    {
        return View();
    }
}