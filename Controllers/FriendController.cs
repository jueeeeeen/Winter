using Microsoft.AspNetCore.Mvc;
using Winter_Project.Models;
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

    public IActionResult Index()
    {
        return View();
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

    // View Friends
    [HttpGet("friends/view")]
    public async Task<IActionResult> MyFriends()
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
}
