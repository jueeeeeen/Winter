namespace Winter_Project.Models
{
    public class RankingViewModel
    {
        public string ReviewedUser { get; set; } = string.Empty;
        public double AverageRating { get; set; }
        public int ReviewCount { get; set; }
    }
}