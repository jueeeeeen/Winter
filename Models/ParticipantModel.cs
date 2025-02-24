using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Winter_Project.Models
{
    public class ParticipantModel
    {

        [Key]
        [Column(Order = 0)]
        public string Username { get; set; } = string.Empty;

        [Key]
        [Column(Order = 1)]
        public int Activity_id { get; set; }

        public string Role { get; set; } = string.Empty;

        public DateTime Join_time { get; set; } = DateTime.UtcNow;
    }
}