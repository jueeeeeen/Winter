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
    [Route("api/account")]
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
            try
            {
                if (await _context.Users.AnyAsync(u => u.Username == model.Username))
                {
                    return BadRequest("Username already exists.");
                }

                var user = new UserModel
                {
                    Name = model.Name,
                    Username = model.Username,
                    Email = model.Email,
                    PasswordHash = HashPassword(model.Password)
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User registered successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", details = ex.Message });
            }
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
                Expires = DateTime.UtcNow.AddHours(1)  // หมดอายุใน 1 ชั่วโมง
            };

            Response.Cookies.Append("token", token, cookieOptions);

            return Ok(new { message = "Login successful" });
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
