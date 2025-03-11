using System.ComponentModel.DataAnnotations;

namespace Winter_Project.Models
{
    public class FriendModel
    {
        public int UserId { get; set; }
        public int FriendId { get; set; }
        public bool IsFriend { get; set; }
        public bool IsPending { get; set; }
        public DateTime time { get; set; } = DateTime.UtcNow;
    }
}