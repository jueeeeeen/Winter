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

    // กำหนด currentUserId จากข้อมูลที่ดึงมา
    var currentUserId = user.Id;

    // ดึงข้อมูลเพื่อนที่เป็นเพื่อนแล้ว
    var friends = await _context.Friends
    .Where(f => (f.UserId == currentUserId || f.FriendId == currentUserId) && f.IsFriend)
    .Select(f => new
    {
        FriendId = (f.UserId == currentUserId) ? f.FriendId : f.UserId, // ถ้า User เป็นเจ้าของ ให้ใช้ FriendId แต่ถ้าเป็น Friend ให้ใช้ UserId
        f.time,
        User = (f.UserId == currentUserId) 
            ? _context.Users.FirstOrDefault(u => u.Id == f.FriendId)
            : _context.Users.FirstOrDefault(u => u.Id == f.UserId)
    })
    .ToListAsync();

    // ดึงข้อมูลเพื่อนที่ส่งคำขอไปและรอการตอบรับจากเพื่อน
    var sentFriendRequests = await _context.Friends
        .Where(f => f.UserId == currentUserId && f.IsPending && !f.IsFriend)
        .Select(f => new
        {
            f.FriendId,
            f.time,
            User = _context.Users.FirstOrDefault(u => u.Id == f.FriendId)
        }).ToListAsync();

    // ดึงข้อมูลคำขอที่เพื่อนส่งมาและรอการตอบรับจากเรา
    var receivedFriendRequests = await _context.Friends
        .Where(f => f.FriendId == currentUserId && f.IsPending && !f.IsFriend)
        .Select(f => new
        {
            f.UserId,
            f.time,
            User = _context.Users.FirstOrDefault(u => u.Id == f.UserId)
        }).ToListAsync();

    // แปลงข้อมูลเป็น FriendViewModel
    var friendViewModels = friends.Select(f => new FriendViewModel
    {
        UserId = f.FriendId,
        Username = f.User?.Username ?? "",
        FirstName = f.User?.FirstName ?? "",
        LastName = f.User?.LastName ?? "",
        IsFriend = true,
        IsPending = false,
        Time = f.time,
        sent = null,
        ProfilePicture = f.User?.ProfilePicture != null
            ? $"data:image/png;base64,{Convert.ToBase64String(f.User.ProfilePicture)}"
            : "/assets/profile-g.png",
    }).ToList();

    var sentRequestViewModels = sentFriendRequests.Select(f => new FriendViewModel
    {
        UserId = f.FriendId,
        Username = f.User?.Username ?? "",
        FirstName = f.User?.FirstName ?? "",
        LastName = f.User?.LastName ?? "",
        IsFriend = false,
        IsPending = true,
        Time = f.time,
        sent = true,
        ProfilePicture = f.User?.ProfilePicture != null
            ? $"data:image/png;base64,{Convert.ToBase64String(f.User.ProfilePicture)}"
            : "/assets/profile-g.png",
    }).ToList();

    var receivedRequestViewModels = receivedFriendRequests.Select(f => new FriendViewModel
    {
        UserId = f.UserId,
        Username = f.User?.Username ?? "",
        FirstName = f.User?.FirstName ?? "",
        LastName = f.User?.LastName ?? "",
        IsFriend = false,
        IsPending = true,
        Time = f.time,
        sent = false,
        ProfilePicture = f.User?.ProfilePicture != null
            ? $"data:image/png;base64,{Convert.ToBase64String(f.User.ProfilePicture)}"
            : "/assets/profile-g.png",
    }).ToList();

    // รวมทั้งเพื่อนที่ยืนยันแล้ว, คำขอที่เราส่งไปและคำขอที่เรารับมา
    var allFriendsAndRequests = friendViewModels
        .Concat(sentRequestViewModels)
        .Concat(receivedRequestViewModels)
        .OrderBy(f => f.IsPending)  // เรียงลำดับตามสถานะคำขอ
        .ThenBy(f => f.IsFriend)   // เรียงลำดับตามสถานะเพื่อน
        .ToList();

    Console.WriteLine($"✅ Total friends and requests found: {allFriendsAndRequests.Count}");

    return View(allFriendsAndRequests); // ส่งข้อมูลทั้งหมดไปยัง View
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
    [HttpPost("friends/accept-friend")]
    public async Task<IActionResult> AcceptFriendRequest([FromBody] FriendRequestModel request)
    {
        int friendId = request.FriendId;
        Console.WriteLine($"✅ FriendId From font: {friendId}");
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
            Console.WriteLine($"✅ Friend request found: {friendId}");

        if (friendRequest != null)
        {
            friendRequest.IsPending = false;
            friendRequest.IsFriend = true;
            friendRequest.time = DateTime.Now;

            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Friend request accepted by {username} for Friend ID: {friendId}");
        }
        else
        {
            Console.WriteLine("🛑 No pending friend request found to accept.");
        }

        return RedirectToAction("Index");
    }


    // Deny Friend Request
    [HttpPost("friends/deny")]
    public async Task<IActionResult> DenyFriendRequest([FromBody] FriendRequestModel request)
    {
        int friendId = request.FriendId;
        Console.WriteLine($"✅ FriendId From front: {friendId}");

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

        // ค้นหาคำขอเพื่อนที่ยังไม่ได้รับการตอบรับ
        var friendRequest = await _context.Friends
            .FirstOrDefaultAsync(f => f.UserId == friendId && f.FriendId == user.Id && f.IsPending);

        if (friendRequest != null)
        {
            // ลบคำขอเพื่อนที่ถูกปฏิเสธ
            _context.Friends.Remove(friendRequest);
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Friend request denied by {username} for Friend ID: {friendId}");
        }
        else
        {
            Console.WriteLine("🛑 No pending friend request found to deny.");
        }

        return RedirectToAction("Index");
    }



    [HttpPost("friends/cancel")]
    public async Task<IActionResult> CancelFriendRequest([FromBody] FriendRequestModel request)
    {
        int friendId = request.FriendId;
        Console.WriteLine($"🛑🛑🛑🛑🛑🛑 Cancelling Friend Request to FriendId: {friendId}");

        var token = Request.Cookies["token"];
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

        // ค้นหาคำขอเป็นเพื่อนที่เราส่งไปและยังรอการตอบรับ
        var pendingRequest = await _context.Friends
            .FirstOrDefaultAsync(f => f.UserId == user.Id && f.FriendId == friendId && f.IsPending && !f.IsFriend);

        if (pendingRequest != null)
        {
            _context.Friends.Remove(pendingRequest);
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Friend request canceled by {user.Username} for Friend ID: {friendId}");
        }
        else
        {
            Console.WriteLine("🛑 No pending friend request found to cancel.");
        }

        return RedirectToAction("Index");
    }


    [HttpPost("friends/remove")]
    public async Task<IActionResult> RemoveFriend([FromBody] FriendRequestModel request)
    {
        int friendId = request.FriendId;
        Console.WriteLine($"🛑🛑🛑🛑🛑🛑 Removing FriendId: {friendId}");

        var token = Request.Cookies["token"];
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

        // ค้นหาข้อมูลเพื่อนที่ต้องการลบ โดยไม่ว่าจะเป็น UserId หรือ FriendId
        var friendship = await _context.Friends
            .FirstOrDefaultAsync(f =>
                (f.UserId == user.Id && f.FriendId == friendId) || 
                (f.UserId == friendId && f.FriendId == user.Id)
            );

        if (friendship != null)
        {
            _context.Friends.Remove(friendship);
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Friendship removed between {user.Username} and Friend ID: {friendId}");
        }
        else
        {
            Console.WriteLine("🛑 No friendship found to remove.");
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
            ProfilePicture = x.user.ProfilePicture != null
                        ? $"data:image/png;base64,{Convert.ToBase64String(x.user.ProfilePicture)}"
                        : "/assets/profile-g.png",
        })
    .ToList();



        return View(users);
    }

    public class FriendRequestModel
    {
        public int FriendId { get; set; }
    }
}
