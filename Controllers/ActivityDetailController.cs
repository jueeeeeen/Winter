using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 
using Microsoft.EntityFrameworkCore;


public class ActivityDetailController: Controller
{
    private readonly WinterContext _context;

    public async Task UpdateActivityStatusAsync()
    {
        var activities = await _context.Activities
            .Where(a => a.Status != "delete") 
            .ToListAsync();

        var currentTime = DateTime.UtcNow;

        foreach (var activity in activities)
        {
            if (activity.Status == "open" && activity.Deadline_time <= currentTime)
            {
                activity.Status = "close"; 
            }
            if (activity.Activity_time.Add(TimeSpan.Parse(activity.Duration)) <= currentTime)
            {
                activity.Status = "done";
            }

            _context.Activities.Update(activity);
        }

        await _context.SaveChangesAsync();
    }

    public ActivityDetailController(ILogger<CreateController> logger, WinterContext context)
    {
        _context = context;
    }
    
    [HttpGet("ActivityDetail/{id}")]
    public async Task<IActionResult> Index(int id)
    {
        await UpdateActivityStatusAsync();

        var activity = await _context.Activities
            .Where(a => a.Activity_id == id)
            .FirstOrDefaultAsync();

        if (activity == null)
        {
            return NotFound("Activity not found");
        }

        // คำนวณ averageRating ของ host
        var averageRating = await _context.Reviews
            .Where(r => r.Reviewed_user == activity.Owner)
            .Select(r => (double?)r.Rating)
            .AverageAsync() ?? 0;

        // ดึงข้อมูล host
        var host = await _context.Users
            .Where(u => u.Username == activity.Owner)
            .Select(u => new 
            {
                Profile_pic = u.ProfilePicture != null 
                                    ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                    : "/assets/profile-g.png",
                u.Username,
                u.FirstName,
                u.LastName,
                u.Gender,
                Rating= averageRating
            })
            .FirstOrDefaultAsync();

        // ดึงข้อมูลของ Participants
        var participants = await _context.Participants
            .Where(p => p.Activity_id == activity.Activity_id)
            .OrderBy(p => p.Role == "host" ? 0 : p.Role == "member" ? 1 : 2)
            .ThenBy(p => p.Join_time)
            .ToListAsync();

        // ดึงข้อมูล Users ของ Participants
        var usernames = participants.Select(p => p.Username).ToList();
        var users = await _context.Users
            .Where(u => usernames.Contains(u.Username))
            .ToListAsync();

        // Map Participants กับ Users
        var participantList = participants.Select(p => new 
        {
            p.Username,
            p.Role,
            User = users
                .Where(u => u.Username == p.Username)
                .Select(u => new 
                {
                    u.FirstName,
                    u.LastName,
                    Profile_pic = u.ProfilePicture != null 
                                        ? $"data:image/png;base64,{Convert.ToBase64String(u.ProfilePicture)}" 
                                        : "/assets/profile-g.png"
                })
                .FirstOrDefault()
        }).ToList();

        // ดึง Token และดึง username จาก JWT
        var token = Request.Cookies["token"];
        var username = string.IsNullOrEmpty(token) ? "" : JwtHelper.DecodeJwt(token);

        ViewBag.Username = username;

        var response = new 
        {
            activity.Activity_id,
            activity.Title,
            activity.Detail,
            activity.Tags,
            activity.Create_time,
            Requirement = activity.Requirement != null ? new 
            {
                activity.Requirement.Gender,
                activity.Requirement.Age,
                activity.Requirement.Other
            } : null,
            activity.Approval,
            activity.Location,
            activity.Activity_time,
            activity.Deadline_time,
            activity.Max_member,
            Member_count = participants.Count(p => p.Role == "member" || p.Role == "host"),
            Pending_count = participants.Count(p => p.Role == "pending"),
            Participants = participantList,
            activity.Duration,
            activity.Status,
            host
        };

        return View(response);
    }


    [HttpPost("ActivityDetail/DeleteActivity/{Activity_id}")]
    public IActionResult DeleteActivity(int Activity_id)
    {
        var activity = _context.Activities.Include(a => a.Participants).FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }
        else {
            activity.Status = "delete";
            _context.SaveChanges();
        }
        

        return Ok(new { message = "Successfully Delete Activity"});
    }

    [HttpPost("ActivityDetail/CloseActivity/{Activity_id}")]
    public IActionResult CloseActivity(int Activity_id)
    {
        var activity = _context.Activities.Include(a => a.Participants).FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }
        else {
            activity.Status = "close";
            _context.SaveChanges();
        }
        

        return Ok(new { message = "Successfully Close Activity"});
    }

    [HttpPost("ActivityDetail/JoinActivity/{Activity_id}")]
    public IActionResult JoinActivity(int Activity_id)
    {
        var token = Request.Cookies["token"];
        var username = string.IsNullOrEmpty(token) ? "" : JwtHelper.DecodeJwt(token);

        var activity = _context.Activities.Include(a => a.Participants).FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }

        var host_user = _context.Users
            .FirstOrDefault(u => u.Username == activity.Owner);
        
        if (host_user == null)
        {
            return NotFound(new { message = "Host user not found" });
        }

        var join_user = _context.Users
            .FirstOrDefault(u => u.Username == username);

        if (join_user == null)
        {
            return NotFound(new { message = "Join user not found" });
        }

        var member_count = activity.Participants.Count(p => p.Role == "member" || p.Role == "host");
        
        // เงื่อนไขพวกนี้ เช็คตั้งแต่ front เดี๋ยวลบทีหลัง
        if (activity.Owner.Contains(username)) return BadRequest(new { message = "User is an Owner." });
        if (activity.Participants.Any(p => p.Username == username)) {
            Console.WriteLine("User is already a participant.");
            return BadRequest(new { message = "User is already a participant." });}
        if (member_count >= activity.Max_member) return BadRequest(new { message = "Activity Full"});

        if (activity.Approval) {
            activity.Participants.Add(
                new ParticipantModel{
                    Username = username,
                    Role = "pending"
                }
            );
            var notification = new NotificationModel
            {
                User_id = host_user.Id,
                Notification_type = "pending",
                Activity_id = Activity_id,
                Activity_user_id = join_user.Id,
                Notification_time = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
        }
        else {
            activity.Participants.Add(
                new ParticipantModel{
                    Username = username,
                    Role = "member"
                }
            );
            var notification = new NotificationModel
            {
                User_id = host_user.Id,
                Notification_type = "join",
                Activity_id = Activity_id,
                Activity_user_id = join_user.Id,
                Notification_time = DateTime.UtcNow
            };

            if (member_count + 1 >= activity.Max_member) activity.Status = "full";

            _context.Notifications.Add(notification);
        }

        _context.SaveChanges();

        return Ok(new { message = "Successfully Joined Activity"});
    }

    [HttpPost("ActivityDetail/LeaveActivity/{Activity_id}")]
    public IActionResult LeaveActivity(int Activity_id)
    {
        var token = Request.Cookies["token"];
        var username = string.IsNullOrEmpty(token) ? "" : JwtHelper.DecodeJwt(token);

        var activity = _context.Activities.Include(a => a.Participants).FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }
        
        var participant = _context.Participants
            .FirstOrDefault(p => p.Username == username && p.Activity_id == Activity_id);

        var host_user = _context.Users
            .FirstOrDefault(u => u.Username == activity.Owner);
        
        if (host_user == null)
        {
            return NotFound(new { message = "Host user not found" });
        }

        var leave_user = _context.Users
            .FirstOrDefault(u => u.Username == username);

        if (leave_user == null)
        {
            return NotFound(new { message = "Leave user not found" });
        }

        if (participant != null)
        {
            if (participant.Role == "member")
            {
                var notification = new NotificationModel
                {
                    User_id = host_user.Id,
                    Notification_type = "leave",
                    Activity_id = Activity_id,
                    Activity_user_id = leave_user.Id,
                    Notification_time = DateTime.UtcNow
                };
                _context.Notifications.Add(notification);
            }

            _context.Participants.Remove(participant);
        }

        if (activity.Status == "full") activity.Status = "open";

        _context.SaveChanges();

        return Ok(new { message = "Successfully Left Activity"});
    }

    [HttpPost("ActivityDetail/DenyActivity/{Activity_id}")]
    public IActionResult DenyActivity(int Activity_id, [FromQuery] string username)
    {
        var activity = _context.Activities.Include(a => a.Participants).FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }
        
        var host_user = _context.Users
            .FirstOrDefault(u => u.Username == activity.Owner);
        
        if (host_user == null)
        {
            return NotFound(new { message = "Host user not found" });
        }

        var join_user = _context.Users
            .FirstOrDefault(u => u.Username == username);

        if (join_user == null)
        {
            return NotFound(new { message = "Join user not found" });
        }

        var participant = _context.Participants
            .FirstOrDefault(p => p.Username == username && p.Activity_id == Activity_id);

        if (participant != null)
        {
            _context.Participants.Remove(participant);

            var notification = new NotificationModel
            {
                User_id = join_user.Id,
                Notification_type = "denied",
                Activity_id = Activity_id,
                Activity_user_id = 0,
                Notification_time = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            _context.SaveChanges();
        }

        return Ok(new { message = $"Denied Username: {username} Successfully"});
    }

    [HttpPost("ActivityDetail/KickActivity/{Activity_id}")]
    public IActionResult KickActivity(int Activity_id, [FromQuery] string username)
    {
        var activity = _context.Activities.Include(a => a.Participants).FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }
        
        var host_user = _context.Users
            .FirstOrDefault(u => u.Username == activity.Owner);
        
        if (host_user == null)
        {
            return NotFound(new { message = "Host user not found" });
        }

        var join_user = _context.Users
            .FirstOrDefault(u => u.Username == username);

        if (join_user == null)
        {
            return NotFound(new { message = "Join user not found" });
        }

        var participant = _context.Participants
            .FirstOrDefault(p => p.Username == username && p.Activity_id == Activity_id);

        if (participant != null)
        {
            _context.Participants.Remove(participant);

            var notification = new NotificationModel
            {
                User_id = join_user.Id,
                Notification_type = "kick",
                Activity_id = Activity_id,
                Activity_user_id = 0,
                Notification_time = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            if (activity.Status == "full") activity.Status = "open";
            _context.SaveChanges();
        }

        return Ok(new { message = $"Denied Username: {username} Successfully"});
    }

    [HttpPost("ActivityDetail/ApproveActivity/{Activity_id}")]
    public IActionResult ApproveActivity(int Activity_id, [FromQuery] string username)
    {
        var activity = _context.Activities.Include(a => a.Participants).FirstOrDefault(a => a.Activity_id == Activity_id);
        if (activity == null) {
            return NotFound(new { message = "Activity Not Found"});
        }

        var host_user = _context.Users
            .FirstOrDefault(u => u.Username == activity.Owner);
        
        if (host_user == null)
        {
            return NotFound(new { message = "Host user not found" });
        }

        var join_user = _context.Users
            .FirstOrDefault(u => u.Username == username);

        if (join_user == null)
        {
            return NotFound(new { message = "Join user not found" });
        }
        
        var participant = _context.Participants
            .FirstOrDefault(p => p.Username == username && p.Activity_id == Activity_id);

        if (participant != null)
        {
            participant.Role = "member";
            participant.Join_time = DateTime.UtcNow;

            var notification = new NotificationModel
            {
                User_id = join_user.Id,
                Notification_type = "approved",
                Activity_id = Activity_id,
                Activity_user_id = 0,
                Notification_time = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            _context.SaveChanges();
        }
        
        var member_count = activity.Participants.Count(p => p.Role == "member" || p.Role == "host");

        if (member_count >= activity.Max_member) {
            
            activity.Status = "full";

            var pendingParticipants = _context.Participants
                .Where(p => p.Activity_id == activity.Activity_id && p.Role == "pending")
                .ToList();

            foreach (var par in pendingParticipants)
            {
                _context.Participants.Remove(par);

                var participant_user = _context.Users.FirstOrDefault(u => u.Username == par.Username);
                
                var notification = new NotificationModel
                {
                    User_id = participant_user.Id,
                    Notification_type = "denied",
                    Activity_id = activity.Activity_id,
                    Activity_user_id = 0,
                    Notification_time = DateTime.UtcNow
                };

                _context.Notifications.Add(notification);
            }
        }

        _context.SaveChanges();

        return Ok(new { message = $"Approved Username: {username} Successfully"});
    }

}