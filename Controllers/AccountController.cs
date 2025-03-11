using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Winter_Project.Models;

namespace Winter_Project.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly WinterContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(WinterContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet("register")]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            Console.WriteLine($"Received Username: {model.Username}, Password: {model.Password} , Email: {model.Email} , FirstName: {model.FirstName}, LastName: {model.LastName} ,DateOfBirth: {model.DateOfBirth} ,Gender: {model.Gender}");
            try
            {
                if (await _context.Users.AnyAsync(u => u.Username == model.Username))
                {
                    return BadRequest("Username already exists.");
                }

                var user = new UserModel
                {
                    Username = model.Username,
                    Email = model.Email,
                    PasswordHash = HashPassword(model.Password),
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    DateOfBirth = model.DateOfBirth,
                    Gender = model.Gender
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var userBio = new UserBio
                {
                    UserId = user.Id,
                    Location = string.Empty,  // ตั้งค่าเริ่มต้นเป็นค่าว่าง
                    Phone = string.Empty,
                    AboutMe = string.Empty,
                    MyInterests = string.Empty,
                    MyHobby = string.Empty
                };

                // เพิ่ม UserBio ลงในฐานข้อมูล
                _context.UserBios.Add(userBio);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User registered successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", details = ex.Message });
            }
        }

        [HttpGet("checkUsername")]
        public async Task<IActionResult> CheckUsername(string username)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username))
            {
                return Ok(new { exists = true });
            }
            return Ok(new { exists = false });
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            return View();
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            Console.WriteLine($"Received Username: {model.Username}, Password: {model.Password}");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
            if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid username or password." });
            }

            // Generate JWT token
            var token = GenerateJwtToken(user);

            // Set JWT token in HttpOnly cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,   // ป้องกันการเข้าถึงจาก JavaScript
                Secure = true,     // ใช้ HTTPS เท่านั้น (ถ้าทดสอบใน localhost อาจต้องปิด)
                SameSite = SameSiteMode.None,  // รองรับ cross-site requests
                Expires = DateTime.UtcNow.AddDays(30)  // หมดอายุใน 1 ชั่วโมง
            };

            Response.Cookies.Append("token", token, cookieOptions);

            return Ok(new { message = "Login successful" });
        }

        public IActionResult Logout()
        {
            Response.Cookies.Delete("token");
            return RedirectToAction("Index", "Home");
        }


        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private static bool VerifyPassword(string enteredPassword, string storedHash)
        {
            return HashPassword(enteredPassword) == storedHash;
        }

        private string GenerateJwtToken(UserModel user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);
            var expiresIn = int.Parse(_configuration["Jwt:ExpiresInHours"]!);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(expiresIn),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}