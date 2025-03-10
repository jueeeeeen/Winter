using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Winter_Project.Models
{
    public class ActivityModel
    {
        // private static int _next_id = 1;
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Activity_id {get; set;}

        public string Owner {get; set;} = string.Empty;
        public string Title {get; set;} = string.Empty;
        public string Detail {get; set;} = string.Empty;
        public DateTime Create_time { get; set; } = DateTime.UtcNow;
        public DateTime Activity_time { get; set; } = DateTime.UtcNow;
        public DateTime Deadline_time { get; set; } = DateTime.UtcNow;
        public string Duration {get; set;} = string.Empty;
        public string Location {get; set;} = string.Empty;
        public int Max_member {get; set;}
        public bool Approval {get; set;}
        public List<string> Tags {get; set;} = new List<string>();

        public RequirementModel Requirement { get; set; } = new RequirementModel();
        
        public ICollection<ParticipantModel> Participants { get; set; } = new List<ParticipantModel>();

        public string Status { get; set; } = string.Empty;

    }
}
