using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Winter_Project.Models
{
    public class ActDisplayOptionModel
    {
        public List<string>? Tag_filter { get; set; }
        public FilterDetails? Filter { get; set; }
        public string? Sort { get; set; }
        public bool Descending { get; set; }
        public string? Seach_key { get; set; }
        public int Page { get; set; }

    }

    public class FilterDetails
    {
        public AgeFilter? Age { get; set; }
        public List<string>? Gender { get; set; }

    }

    public class AgeFilter
    {
        public int? Min { get; set; }
        public int? Max { get; set; }
    }
}
