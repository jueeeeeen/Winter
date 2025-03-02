using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
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
            var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

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

            var userBio = await _context.UserBios.FirstOrDefaultAsync(b => b.UserId == user.Id);

            var profileViewModel = new ProfileViewModel
            {
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
                Location = userBio?.Location ?? "No information",
                Phone = userBio?.Phone ?? "No information",
                AboutMe = userBio?.AboutMe ?? "No information",
                MyInterests = userBio?.MyInterests ?? "No information",
                MyHobby = userBio?.MyHobby ?? "No information",
                ProfilePictureBase64 = user.ProfilePicture != null ? $"data:image/png;base64,{Convert.ToBase64String(user.ProfilePicture)}" : null
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
            var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

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

            var userBio = await _context.UserBios.FirstOrDefaultAsync(b => b.UserId == user.Id);

            var profileViewModel = new ProfileViewModel
            {
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
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

    [HttpPost]
    public async Task<IActionResult> Edit(ProfileViewModel model)
    {
        if (!ModelState.IsValid)
        {
            Console.WriteLine("⚠️ ModelState is invalid");
            foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            {
                Console.WriteLine($"Error: {error.ErrorMessage}");
            }
            return View(model);
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

        var userBio = await _context.UserBios.FirstOrDefaultAsync(b => b.UserId == user.Id);
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
            await _context.SaveChangesAsync();
            Console.WriteLine("✅ Data saved to database successfully.");
            return RedirectToAction("Index");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"🔥 Error while saving: {ex.Message}");
            ModelState.AddModelError(string.Empty, "An error occurred while saving the profile.");
            return View(model);
        }
    }
}
