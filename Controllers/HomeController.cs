using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models;
using Microsoft.Extensions.Logging;

namespace Winter_Project.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly WinterContext _context;

        // ใช้ DI Inject WinterContext เข้ามาในคอนสตรัคเตอร์
        public HomeController(ILogger<HomeController> logger, WinterContext context)
        {
            _logger = logger;
            _context = context; // เก็บไว้ในตัวแปร _context
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
            if (ModelState.IsValid)
            {
                // ใช้ _context ซึ่งเป็น WinterContext ที่ Inject มา
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            
            return RedirectToAction("Index"); // หรือไปที่หน้าที่ต้องการหลังการบันทึก
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
