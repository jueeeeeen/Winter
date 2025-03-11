using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models;
using Winter_Project.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Winter_Project.Services;

public class FriendController : Controller
{
    private readonly WinterContext _context;

    public FriendController(WinterContext context)
    {
        _context = context;
    }

    // View Friends
    [HttpGet("Friend")]
    public async Task<IActionResult> Index()
    {
        var token = Request.Cookies["token"];
        Console.WriteLine($"🛑 Received Token: {token}");

        if (string.IsNullOrEmpty(token))
        {
            Console.WriteLine("⚠️ Token is missing");
            return RedirectToAction("Login", "Account");
        }

        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
        Console.WriteLine($"🔑 Username from Token: {username}");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            Console.WriteLine("⚠️ User not found for username: " + username);
            return RedirectToAction("Login", "Account");
        }

        var friends = await _context.Friends
            .Where(f => f.UserId == user.Id && f.IsFriend)
            .ToListAsync();

        Console.WriteLine($"✅ {friends.Count} friends found for username: {username}");

        return View(friends);
    }

    // Add Friend
    [HttpPost("friends/add")]
    public async Task<IActionResult> AddFriend(int friendId)
    {
        var token = Request.Cookies["token"];
        Console.WriteLine($"🛑 Received Token: {token}");

        if (string.IsNullOrEmpty(token))
        {
            Console.WriteLine("⚠️ Token is missing");
            return RedirectToAction("Login", "Account");
        }

        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
        Console.WriteLine($"🔑 Username from Token: {username}");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            Console.WriteLine("⚠️ User not found for username: " + username);
            return RedirectToAction("Login", "Account");
        }

        var friendModel = new FriendModel
        {
            UserId = user.Id,
            FriendId = friendId,
            IsFriend = false,
            IsPending = true
        };

        _context.Friends.Add(friendModel);
        await _context.SaveChangesAsync();
        Console.WriteLine($"✅ Friend request sent from {username} to Friend ID: {friendId}");

        return RedirectToAction("Index");
    }

    // Accept Friend Request
    [HttpPost("friends/accept")]
    public async Task<IActionResult> AcceptFriendRequest(int friendId)
    {
        var token = Request.Cookies["token"];
        Console.WriteLine($"🛑 Received Token: {token}");

        if (string.IsNullOrEmpty(token))
        {
            Console.WriteLine("⚠️ Token is missing");
            return RedirectToAction("Login", "Account");
        }

        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);
        var username = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
        Console.WriteLine($"🔑 Username from Token: {username}");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            Console.WriteLine("⚠️ User not found for username: " + username);
            return RedirectToAction("Login", "Account");
        }

        var friendRequest = await _context.Friends
            .FirstOrDefaultAsync(f => f.UserId == friendId && f.FriendId == user.Id && f.IsPending);

        if (friendRequest != null)
        {
            friendRequest.IsPending = false;
            friendRequest.IsFriend = true;
            friendRequest.time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Friend request accepted by {username} for Friend ID: {friendId}");
        }
        else
        {
            Console.WriteLine("⚠️ No pending friend request found to accept.");
        }

        return RedirectToAction("Index");
    }

    [HttpGet("friend/findfriend")]
    public IActionResult FindFriend(string search_string)
    {
        var username = Get_username_from_token();
        ViewData["username"] = username;

        if(username == null) {
            return View();
        }

        var userId = _context.Users.FirstOrDefault(u => u.Username == username)?.Id;

        if(search_string == null)
        {
            var initial_users = _context.Users
            .Where(u => u.Id != userId && !_context.Friends
                .Any(f => (f.UserId == u.Id && f.FriendId == userId) || (f.UserId == userId && f.FriendId == u.Id)))
            .Select(u => new FriendViewModel
            {
                UserId = u.Id,
                Username = u.Username,
                FirstName = u.FirstName,
                LastName = u.LastName,
                ProfilePicture = u.ProfilePicture != null
                    ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}"
                    : "/assets/profile-g.png"
            })
            .Take(10)
            .ToList();
            Console.WriteLine(initial_users.Count());
            ViewData["search"] = false;
            return View(initial_users);
        }
        

        var users = _context.Users
        .Where(u => u.Username.Contains(search_string))
        .ToList();

        if(users == null){
            return View();
        }

        var friends = _context.Friends
        .Where(f => (f.UserId == userId || f.FriendId == userId) && (users.Select(u => u.Id).Contains(f.UserId) || users.Select(u => u.Id).Contains(f.FriendId)))
        .ToList();


        var result = users.Select(user => new FriendViewModel
        {
            UserId = user.Id,
            FriendId = friends?.FirstOrDefault(f => f.UserId == user.Id || f.FriendId == user.Id)?.FriendId,
            Username = user.Username,
            FirstName = user.FirstName,
            LastName = user.LastName,
            IsFriend = friends?.FirstOrDefault(f => f.UserId == user.Id)?.IsFriend ?? false,
            IsPending = friends?.FirstOrDefault(f => f.UserId == user.Id)?.IsPending ?? false,
            Time = friends?.FirstOrDefault(f => f.UserId == user.Id || f.FriendId == user.Id)?.time,
            ProfilePicture = user.ProfilePicture != null
                ? $"data:image/png;base64,{Convert.ToBase64String(user.ProfilePicture)}"
                : "/assets/profile-g.png",
        }).ToList();

        ViewData["search"] = true;
        return View(result);
    }

    private string Get_username_from_token()
    {
        var token = Request.Cookies["token"];
        var username = string.IsNullOrEmpty(token) ? "" : JwtHelper.DecodeJwt(token);
        return username;
    }
}
