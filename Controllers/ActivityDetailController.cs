using Microsoft.AspNetCore.Mvc;

namespace Winter_Project.Controllers;
public class ActivityDetailController: Controller
{
    // public IActionResult Index(int activity_id)
    // {
    //     // add context to fetch data from database
    //     WinterActivity activity = activity00;
    //     return View(activity);
    // }
    public IActionResult Index()
    {
        return View();
    }
}