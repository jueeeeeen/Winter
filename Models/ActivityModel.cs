using System.ComponentModel.DataAnnotations;

namespace Winter_Project.Models
{
    public class ActivityModel
    {
        private static int _next_id = 1;
        
        [Key]
        public int Activity_id { get; set; }

        public string Owner { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Detail { get; set; } = string.Empty;
        public string Create_time { get; set; } = string.Empty;
        public string Activity_time { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int Max_member { get; set; }
        public bool Approval { get; set; }
        public List<string> Tags { get; set; } = new List<string>();

        public RequirementModel? Requirement { get; set; } // ✅ ใช้ nullable reference

        public List<string> Participants { get; set; } = new List<string>();

        public string Status { get; set; } = string.Empty;

        public ActivityModel()
        {
            Console.WriteLine($"Creating ActivityModel. _next_id = {_next_id}");
            Activity_id = _next_id++;
        }
    }
}
