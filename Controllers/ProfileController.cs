using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Winter_Project.Models;
using Winter_Project.ViewModels;

public class ProfileController : Controller
{
    private readonly WinterContext _context;

    public ProfileController(WinterContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var token = Request.Cookies["token"];

        if (string.IsNullOrEmpty(token))
        {
            return RedirectToAction("Login", "Account");
        }

        try
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

            if (string.IsNullOrEmpty(username))
            {
                return RedirectToAction("Login", "Account");
            }

            // 🔥 Redirect ไปที่ `/Profile/{username}`
            return RedirectToAction("ViewProfile", new { username = username });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"🔥 Exception: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpGet("profile/edit")]
    public async Task<IActionResult> Edit()
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

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                Console.WriteLine("⚠️ User not found in database");
                return NotFound();
            }

            var userBio = _context.UserBios.FirstOrDefault(b => b.UserId == user.Id);

            var profileViewModel = new ProfileViewModel
            {
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,
                Location = userBio?.Location ?? "No information",
                Phone = userBio?.Phone ?? "No information",
                AboutMe = userBio?.AboutMe ?? "No information",
                MyInterests = userBio?.MyInterests ?? "No information",
                MyHobby = userBio?.MyHobby ?? "No information",
                ProfilePictureBase64 = user.ProfilePicture != null
                    ? $"data:image/png;base64,{Convert.ToBase64String(user.ProfilePicture)}"
                    : Url.Content("~/assets/Profile-w-b.png")
            };

            Console.WriteLine($"✅ User Profile Loaded: {profileViewModel.Username}");
            return View(profileViewModel);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"🔥 Exception: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPost("profile/edit")]
    public async Task<IActionResult> Edit(ProfileViewModel model)
    {
        if (!ModelState.IsValid)
        {
            Console.WriteLine("⚠️ ModelState is invalid");
            foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            {
                Console.WriteLine($"Error: {error.ErrorMessage}");
            }
            return View(model);  // Return the form with validation errors
        }

        var token = Request.Cookies["token"];
        if (string.IsNullOrEmpty(token))
        {
            return RedirectToAction("Login", "Account");
        }

        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(username))
        {
            return RedirectToAction("Login", "Account");
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null)
        {
            return NotFound();
        }

        var userBio = _context.UserBios.FirstOrDefault(b => b.UserId == user.Id);
        if (userBio == null)
        {
            userBio = new UserBio
            {
                UserId = user.Id,
                Location = model.Location,
                Phone = model.Phone,
                AboutMe = model.AboutMe,
                MyInterests = model.MyInterests,
                MyHobby = model.MyHobby
            };
            _context.UserBios.Add(userBio);
        }
        else
        {
            userBio.Location = model.Location;
            userBio.Phone = model.Phone;
            userBio.AboutMe = model.AboutMe;
            userBio.MyInterests = model.MyInterests;
            userBio.MyHobby = model.MyHobby;
        }

        user.FirstName = model.FirstName;
        user.LastName = model.LastName;
        user.Email = model.Email;
        user.DateOfBirth = model.DateOfBirth;
        user.Gender = model.Gender;

        if (model.ProfilePictureFile != null && model.ProfilePictureFile.Length > 0)
        {
            using (var memoryStream = new MemoryStream())
            {
                await model.ProfilePictureFile.CopyToAsync(memoryStream);
                user.ProfilePicture = memoryStream.ToArray();
            }
        }

        try
        {
            _context.SaveChanges();  // Save changes to the database
            Console.WriteLine("✅ Data saved to database successfully.");
            return RedirectToAction("Index");  // Redirect to the profile page
        }
        catch (Exception ex)
        {
            // Log the exception or display an error message
            Console.WriteLine($"Error while saving: {ex.Message}");
            ModelState.AddModelError(string.Empty, "An error occurred while saving the profile.");
            return View(model);  // Return the same view if there is an error
        }
    }

    [Route("profile/{username}")]
    public async Task<IActionResult> ViewProfile(string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            return NotFound("Username is required");
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null)
        {
            return NotFound("User not found");
        }

        // ดึงข้อมูลผู้ใช้ที่ล็อกอิน
        var token = Request.Cookies["token"];
        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var loggedInUsername = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        ViewBag.IsOwner = (username == loggedInUsername); // เช็คว่าเป็นเจ้าของโปรไฟล์หรือไม่

        var userBio = _context.UserBios.FirstOrDefault(b => b.UserId == user.Id);

        var profileViewModel = new ProfileViewModel
        {
            Username = user.Username,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            DateOfBirth = user.DateOfBirth,
            Gender = user.Gender,
            Location = userBio?.Location ?? "No information",
            Phone = userBio?.Phone ?? "No information",
            AboutMe = userBio?.AboutMe ?? "No information",
            MyInterests = userBio?.MyInterests ?? "No information",
            MyHobby = userBio?.MyHobby ?? "No information",
            ProfilePictureBase64 = user.ProfilePicture != null
                ? $"data:image/png;base64,{Convert.ToBase64String(user.ProfilePicture)}"
                : Url.Content("~/assets/Profile-w-b.png")
        };
        

        return View("Index", profileViewModel);
    }
}