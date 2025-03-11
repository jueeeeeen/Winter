namespace Winter_Project.Models
{
public class RankingViewModel
{
    public string ReviewedUser { get; set; }
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public byte[]? ProfilePicture { get; set; }
}
}