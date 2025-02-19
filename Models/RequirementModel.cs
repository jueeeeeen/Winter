using System.ComponentModel.DataAnnotations;

namespace Winter_Project.Models
{
    public class RequirementModel
    {
        [Key]
        public int Requirement_id { get; set; }
        public int Activity_id { get; set; } // Foreign Key ที่เชื่อมโยงกับ ActivityModel

        public string Gender { get; set; } = string.Empty;
        public int Age { get; set; } = 0;
        public string Other { get; set; } = string.Empty;
    }
}
