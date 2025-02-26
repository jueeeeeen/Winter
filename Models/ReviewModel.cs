using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Winter_Project.Models
{
    public class ReviewModel
    {
        [Key]
        public int ReviewId { get; set; }
        
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public UserModel Users {get; set;} = new UserModel();
        
        public int ActivityId { get; set; }
        [ForeignKey("ActivityId")]
        public ActivityModel Activities {get; set;} = new ActivityModel();
        [Required(ErrorMessage = "Rating is required")]
        [Range(0, 5)]
        public float Rating {get; set;} 
        [Required(ErrorMessage = "Comment is required")]
        public string Comment {get; set;} = string.Empty;
        public DateTime Time {get; set;}
    }
}