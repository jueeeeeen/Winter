namespace Winter_Project.ViewModels
{
    public class FriendViewModel
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? ProfilePicture { get; set; } = string.Empty;
        public bool IsFriend { get; set; }
        public bool IsPending { get; set; }
        public bool? sent { get; set; }
        public DateTime Time { get; set; } = DateTime.UtcNow;
    }
}