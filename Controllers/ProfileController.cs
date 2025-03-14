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

        ViewBag.IsOwner = (username == loggedInUsername);
        
        string GetFriendStatus(int loggedInUserId, int profileUserId)
        {
            var friends = _context.Friends.ToList();

            var friend = friends.FirstOrDefault(f =>
                (f.UserId == loggedInUserId && f.FriendId == profileUserId) ||
                (f.UserId == profileUserId && f.FriendId == loggedInUserId));

            if (friend == null)
            {
                return "No relationship"; // ไม่มีกลุ่มความสัมพันธ์
            }
            else if (friend.IsFriend)
            {
                return $"you have been friends with them since {friend.time.ToLocalTime().ToString("MMMM dd, yyyy")}"; // เป็นเพื่อนกันแล้ว
            }
            else if (friend.IsPending)
            {
                if (friend.UserId == loggedInUserId)
                    return "Request sent"; // คำขอเป็นเพื่อนถูกส่งแล้ว
                else
                    return "Request received"; // คำขอเป็นเพื่อนที่รับมา
            }
            return "No relationship"; // ถ้าไม่มีสถานะอื่น
        }

        var loggedInUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == loggedInUsername);
        string status = "No relationship"; // ค่า default
        if (loggedInUser != null)
        {
            status = GetFriendStatus(loggedInUser.Id, user.Id);
        }

        ViewBag.FriendStatus = status;

        var userBio = _context.UserBios.FirstOrDefault(b => b.UserId == user.Id);

        var reviewCount = await _context.Reviews
            .CountAsync(r => r.Reviewed_user == user.Username);
        
        var activityCount = await _context.Participants
            .Join(_context.Activities,
                p => p.Activity_id,
                a => a.Activity_id,
                (p, a) => new { Participant = p, Activity = a })
            .CountAsync(pa => pa.Participant.Username == user.Username && pa.Activity.Status == "done");

        var averageRating = await _context.Reviews
            .Where(r => r.Reviewed_user == user.Username)
            .Select(r => (double?)r.Rating) // ใช้ double? เพื่อป้องกัน error หากไม่มีข้อมูล
            .AverageAsync() ?? 0;


        var profileViewModel = new ProfileViewModel
        {
            UserId = user.Id,
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
                : Url.Content("~/assets/Profile-w-b.png"),
            ReviewCount = reviewCount,
            ActivityCount = activityCount,
            AverageRating = averageRating
        };
        

        return View("Index", profileViewModel);
    }
}