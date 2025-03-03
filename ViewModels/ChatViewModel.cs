namespace Winter_Project.ViewModels
{
    public class ChatViewModel
    {
        public List<ChatMessageViewModel>? Messages { get; set; }
        public List<MemberViewModel>? Group_member { get; set; }
    }
    public class ChatMessageViewModel
    {
        public string Username { get; set; } = string.Empty;
        public string First_name { get; set; } = string.Empty;
        public string Last_name { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Timestamp { get; set; } = string.Empty;
    }

        public class MemberViewModel
    {
        public string Username { get; set; } = string.Empty;
        public string First_name { get; set; } = string.Empty;
        public string Last_name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
