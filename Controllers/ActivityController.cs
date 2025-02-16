using Microsoft.AspNetCore.Mvc;

namespace Winter_Project.Controllers;
public class ActivityController: Controller
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

    // [HttpGet]
    // public JsonResult GetActivityCards()
    // {
    //     var activities = _activityService.GetActivities(); // chat บอก อันนี้เป็นการดึงข้อมูลจาก database เลยแปะไว้ก่อน
    //     return Json(activities, JsonRequestBehavior.AllowGet);
    // }
}