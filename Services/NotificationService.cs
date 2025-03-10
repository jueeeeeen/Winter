using Microsoft.EntityFrameworkCore;
using Winter_Project.Models;
using Winter_Project.ViewModels;

namespace Winter_Project.Services
{
    public class NotificationService
    {
        private readonly WinterContext _context;

        public NotificationService(WinterContext context)
        {
            _context = context;
        }

        public async Task<List<NotificationViewModel>> GetUserNotificationsAsync(string username)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return new List<NotificationViewModel>();
            }

            var activityData = await _context.Notifications
                .Where(n => n.User_id == user.Id)
                .Select(n => new { n.Activity_user_id, n.Activity_id })
                .Distinct()
                .ToListAsync();

            var activityUsers = await _context.Users
                .Where(u => activityData.Select(a => a.Activity_user_id).Contains(u.Id))
                .ToDictionaryAsync(u => u.Id, u => new { u.FirstName, u.LastName });

            var activities = await _context.Activities
                .Where(a => activityData.Select(d => d.Activity_id).Contains(a.Activity_id))
                .ToDictionaryAsync(a => a.Activity_id, a => a.Title);

            var notifications = await _context.Notifications
                .Where(n => n.User_id == user.Id)
                .OrderByDescending(n => n.Notification_time)
                .ToListAsync();

            return notifications.Select(n => new NotificationViewModel
            {
                Id = n.Id,
                User_id = n.User_id,
                Notification_time = n.Notification_time,
                Notification_type = n.Notification_type,
                Activity_id = n.Activity_id,
                ActivityTitle = activities.ContainsKey(n.Activity_id) ? activities[n.Activity_id] : null,
                ActivityUserFirstName = activityUsers.ContainsKey(n.Activity_user_id) ? activityUsers[n.Activity_user_id].FirstName : null,
                ActivityUserLastName = activityUsers.ContainsKey(n.Activity_user_id) ? activityUsers[n.Activity_user_id].LastName : null
            }).ToList();
        }
    }
}
