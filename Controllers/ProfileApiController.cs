using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models; // ใส่ชื่อที่เหมาะสมตามโปรเจคของคุณ
using System.Linq;
using Winter_Project.ViewModels;
using System.IdentityModel.Tokens.Jwt;

namespace Winter_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileApiController : ControllerBase
    {
        private readonly WinterContext _context;

        // Constructor
        public ProfileApiController(WinterContext context)
        {
            _context = context;
        }

        // GET api/ProfileApi/getUserProfile
        [HttpGet("getUserProfile")]
        public IActionResult GetUserProfile()
        {
            // คุณสามารถดึงข้อมูลจากคุกกี้ หรือ Token JWT ที่ส่งมาใน request เพื่อยืนยันตัวผู้ใช้
            var token = Request.Cookies["token"];
            Console.WriteLine($"Token: {token}");

            if (string.IsNullOrEmpty(token))
            { 
                Console.WriteLine("⚠️ Token is missing");
                return RedirectToAction("Login", "Account");
            }

            // ตัวอย่างการดึงข้อมูลโปรไฟล์จากฐานข้อมูล
            var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        Console.WriteLine($"Decoded JWT: {jwtSecurityToken}");

        // ดึง Username จาก "sub"
        var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        Console.WriteLine($"Extracted Username: {username}");

        if (string.IsNullOrEmpty(username))
        {
            Console.WriteLine("⚠️ Username is null or empty!");
            return RedirectToAction("Login", "Account");
        }

        var user = _context.Users.FirstOrDefault(u => u.Username == username);

        if (user == null)
        {
            Console.WriteLine("⚠️ User not found in database");
            return NotFound();
        }

        var userBio = _context.UserBios.FirstOrDefault(b => b.UserId == user.Id);

         var Model = new UserModel
            {
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
            };

        Console.WriteLine($"✅ User Profile Navbar Loaded: {Model.Username} {Model.FirstName} {Model.LastName}");
        return Ok(Model); // ส่งข้อมูลกลับไป
        }
    }
}
