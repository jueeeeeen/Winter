using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Winter_Project.Models; 

public class ProfileController : Controller
{
    private readonly WinterContext _context;

    public ProfileController(WinterContext context)
    {
        _context = context;
    }

    public IActionResult Index()
{
    var token = Request.Cookies["token"];
    Console.WriteLine($"Token: {token}");

    if (string.IsNullOrEmpty(token))
    { 
        Console.WriteLine("⚠️ Token is missing");
        return RedirectToAction("Login", "Account");
    }

    try
    {
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

        Console.WriteLine($"✅ User Found: {user.Username}");
        return View(user);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"🔥 Exception: {ex.Message}");
        return StatusCode(500, "Internal Server Error");
    }
}
}
