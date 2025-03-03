using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
// using System.Text.Json.Serialization;

namespace Winter_Project.Models
{
    public class ReviewModel
    {
        [Key]
        public int Review_id { get; set; }
        [ForeignKey("User_id")]
        public int User_id { get; set; }
        public int Reviewed_user { get; set; }
        [ForeignKey("Activity_id")]
        public int Activity_id { get; set; }
        [Required(ErrorMessage = "Rating is required")]
        [Range(0, 5)]
        public float Rating {get; set;} 
        [Required(ErrorMessage = "Comment is required")]
        public string Comment {get; set;} = string.Empty;
        public DateTime Time {get; set;}
    }
}