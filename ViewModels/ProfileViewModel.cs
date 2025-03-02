namespace Winter_Project.ViewModels
{
    public class ProfileViewModel
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;

        // ข้อมูลจาก UserBio
        public string Location { get; set; } = "No information";
        public string Phone { get; set; } = "No information";
        public string AboutMe { get; set; } = "No information";
        public string MyInterests { get; set; } = "No information";
        public string MyHobby { get; set; } = "No information";
    }
}
