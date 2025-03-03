using System.ComponentModel.DataAnnotations;

namespace Winter_Project.Models
{
    public class UserModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password hash is required")]
        public string PasswordHash { get; set; } = string.Empty;

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Date of Birth is required")]
        public DateOnly DateOfBirth { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        public string Gender { get; set; } = string.Empty;
        public byte[]? ProfilePicture { get; set; }
        public ICollection<UserBio>? UserBios { get; set; }
    }
}