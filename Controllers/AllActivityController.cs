using Microsoft.AspNetCore.Mvc;

namespace Winter_Project.Controllers;
public class AllActivityController: Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public IActionResult Index(string search_string)
    {
        ViewBag.keyword = search_string;
        return View();
    }

    [HttpPost]
    public IActionResult Index([FromBody] string[] tags)
    {
        return Json(new { Tags = tags });
    }

}