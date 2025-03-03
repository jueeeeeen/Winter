using Microsoft.EntityFrameworkCore;
using Winter_Project.Models;

namespace Winter_Project.Services
{
    public class NotificationService
    {
        private readonly WinterContext _context;

        // Constructor ที่รับ WinterContext เพื่อใช้ในการเข้าถึงฐานข้อมูล
        public NotificationService(WinterContext context)
        {
            _context = context;
        }

        // เมธอดที่ใช้ดึงข้อมูล Notification ของผู้ใช้จากฐานข้อมูล
        public async Task<List<NotificationModel>> GetUserNotificationsAsync(string username)
        {
            // หาผู้ใช้จากฐานข้อมูลโดยใช้ username
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);

            // ถ้าผู้ใช้ไม่พบ ให้ส่งกลับ List ว่าง
            if (user == null)
            {
                return new List<NotificationModel>();
            }

            // ดึงข้อมูล Notifications ของผู้ใช้จากฐานข้อมูล
            var notifications = await _context.Notifications
                .Where(n => n.User_id == user.Id)  // กรองตาม User_id
                .OrderByDescending(n => n.Notification_time) // เรียงลำดับตามเวลา (ล่าสุดไปเก่า)
                .ToListAsync();

            // คืนค่ารายการ Notification
            return notifications;
        }
    }
}