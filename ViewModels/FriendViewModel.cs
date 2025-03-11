namespace Winter_Project.ViewModels
{
    public class FriendViewModel
    {
        public int UserId { get; set; }
        public int? FriendId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? ProfilePicture { get; set; } = string.Empty;
        public bool IsFriend { get; set; }
        public bool IsPending { get; set; }
        public string? Time {get; set;} = string.Empty;
    }
}