// UserBio.cs
using System.ComponentModel.DataAnnotations;

namespace Winter_Project.Models
{
    public class UserBio
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        [Required]
        public string Bio { get; set; } = string.Empty;

        // สร้างการเชื่อมโยงกับ UserModel
        [Required]
        public UserModel? User { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string AboutMe { get; set; } = string.Empty;
        public string MyInterests { get; set; } = string.Empty;
        public string MyHobby { get; set; } = string.Empty;
    }
}
