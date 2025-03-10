namespace Winter_Project.ViewModels
{
    public class NotificationViewModel
    {
        public int Id { get; set; }
        public int User_id { get; set; }
        public DateTime Notification_time { get; set; }
        public string Notification_type { get; set; }
        public int Activity_id { get; set; }
        public int Activity_user_id { get; set; }
        public string ActivityTitle { get; set; }
        public string ActivityUserFirstName { get; set; }
        public string ActivityUserLastName { get; set; }
    }
}
