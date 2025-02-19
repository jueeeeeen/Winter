using System.ComponentModel.DataAnnotations;

namespace Winter_Project.Models
{
    public class RequirementModel
    {
        public string gender {get; set;} = string.Empty;
        public int age {get; set;} = int.Empty;
        public string other {get; set;} = string.Empty;
    }
}