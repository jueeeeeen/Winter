using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Winter_Project.Models
{
    public class NotificationModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary key

        public int User_id { get; set; }

        public string Notification_type { get; set; } = string.Empty;

        public int Activity_id { get; set; }

        public int Activity_user_id { get; set; }

        public byte[]? ProfilePicture { get; set; }
        public ICollection<UserBio>? UserBios { get; set; }

        public DateTime Notification_time { get; set; } = DateTime.UtcNow;
    }
}