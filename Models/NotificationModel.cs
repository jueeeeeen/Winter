using System.ComponentModel.DataAnnotations;

namespace Winter_Project.Models
{
    public class NotificationModel
    {
        [Key]
        public int User_id { get; set; }

        public string title { get; set; } = string.Empty;
        public string detail { get; set; } = string.Empty;

        public DateTime time { get; set; } = DateTime.UtcNow;
    }
}