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
        public string Create_time {get; set;} = string.Empty;
        public string Activity_time {get; set;} = string.Empty;
        public string Deadline_time {get; set;} = string.Empty;
        public string Duration {get; set;} = string.Empty;
        public string Location {get; set;} = string.Empty;
        public int Max_member {get; set;}
        public bool Approval {get; set;}
        public List<string> Tags {get; set;} = new List<string>();

        public RequirementModel Requirement { get; set; } = new RequirementModel();
        
        public ICollection<ParticipantModel> Participants { get; set; } = new List<ParticipantModel>();

        public string Status { get; set; } = string.Empty;

        public void Create_ActivityModel(string owner, string title, string detail, string activity_time, string deadline_time, string duration, string location, int max_member, bool approval,List<string> tags, string gender, int age, string other)
        {
            Owner = owner;
            Title = title;
            Detail = detail;
            Create_time = DateTime.UtcNow.ToString("o");
            Activity_time = activity_time;
            Deadline_time = deadline_time;
            Duration = duration;
            Location = location;
            Max_member = max_member;
            Approval = approval;
            Tags = tags;
            Requirement = new RequirementModel
            {
                Gender = gender,
                Age = age,
                Other = other
            };
            Participants = [
                new ParticipantModel {
                    Username = owner,
                    Role = "host"
                }
            ];
            Status = "open";
        }
    }


}
