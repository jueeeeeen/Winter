using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Winter_Project.Models
{
    public class ActivityModel
    {
        private static int _next_id = 1;
        
        [Key]
        public int Activity_id {get; set;}

        public string Owner {get; set;} = string.Empty;
        public string Title {get; set;} = string.Empty;
        public string Detail {get; set;} = string.Empty;
        public string Create_time {get; set;} = string.Empty;
        public string Activity_time {get; set;} = string.Empty;
        public string Duration {get; set;} = string.Empty;
        public string Location {get; set;} = string.Empty;
        public int Max_member {get; set;}
        public bool Approval {get; set;}
        public string Tags {get; set;} = string.Empty;

        // requirement
        public RequirementModel? Requirements { get; set; }

        public List<string> Participants {get; set;} = [];

        public string Status {get; set;} = string.Empty;

        public void Activity()
        {
            Activity_id = _next_id++;
        }
    }
}