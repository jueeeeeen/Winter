using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Winter_Project.Models
{
    public class ChatMessageModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary key
        public int Activity_id { get; set; } // The ID of the activity this message belongs to
        public string Username { get; set; } // The username of the person sending the message
        public string Message { get; set; } // The message content
        public DateTime Timestamp { get; set; } // Timestamp of when the message was sent
    }
}