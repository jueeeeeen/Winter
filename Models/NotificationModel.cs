using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Winter_Project.Models
{
    public class NotificationModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int User_id { get; set; }

        public string Notification_type { get; set; } = string.Empty;

        public int Activity_id { get; set; }

        public int Activity_user_id { get; set; }

        public DateTime Notification_time { get; set; } = DateTime.UtcNow;

        public bool New { get; set; } = false;
    }
}