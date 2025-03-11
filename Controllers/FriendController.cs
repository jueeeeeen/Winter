using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models;
using Winter_Project.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

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
        if (string.IsNullOrEmpty(search_string))
        {
            return View();
        }

        var users = _context.Users
    .Where(u => u.Username.Contains(search_string))
    .GroupJoin(
        _context.Friends,
        user => user.Id,
        friend => friend.UserId,
        (user, friends) => new { user, friends }
    )
    .SelectMany(
        x => x.friends.DefaultIfEmpty(), // Left Join equivalent
        (x, friend) => new FriendViewModel
        {
            UserId = x.user.Id, // Always using user.Id
            Username = x.user.Username,
            FirstName = x.user.FirstName,
            LastName = x.user.LastName,
            IsFriend = friend != null ? friend.IsFriend : false, // If no friend, set to false
            IsPending = friend != null ? friend.IsPending : false, // If no friend, set to false
            Time = friend != null ? friend.time : null, // If no friend, this will be null
            ProfilePicture = x.user.ProfilePicture != null
                        ? $"data:image/png;base64,{Convert.ToBase64String(x.user.ProfilePicture)}"
                        : "/assets/profile-g.png",
        })
    .ToList();



        return View(users);
    }
}
