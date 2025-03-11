using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Winter_Project.Models;

namespace Winter_Project.Controllers
{
    public class RankingController : Controller
    {
        private readonly WinterContext _context;

        public RankingController(WinterContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var rankings = await _context.Reviews
                .GroupBy(r => r.Reviewed_user)
                .Select(g => new RankingViewModel
                {
                    ReviewedUser = g.Key!,
                    AverageRating = g.Average(r => r.Rating),
                    ReviewCount = g.Count()
                })
                .OrderByDescending(r => r.AverageRating)
                .ThenByDescending(r => r.ReviewCount)
                .Take(10)
                .ToListAsync();

            int remaining = 10 - rankings.Count;
            if (remaining > 0)
            {
                var placeholders = Enumerable.Range(0, remaining)
                    .Select(_ => new RankingViewModel
                    {
                        ReviewedUser = "-",
                        AverageRating = 0,
                        ReviewCount = 0
                    });

                rankings = rankings.Concat(placeholders).ToList();
            }

            var reviewedUsers = rankings.Select(r => r.ReviewedUser).Distinct().ToList();
            var userDetails = await _context.Users
                .Where(u => reviewedUsers.Contains(u.Username)) 
                .Select(u => new
                {
                    u.Username,
                    u.FirstName,
                    u.LastName,
                    u.ProfilePicture
                })
                .ToListAsync();

            foreach (var ranking in rankings)
            {
                var userDetail = userDetails.FirstOrDefault(u => u.Username == ranking.ReviewedUser);
                if (userDetail != null)
                {
                    ranking.FirstName = userDetail.FirstName;
                    ranking.LastName = userDetail.LastName;
                    ranking.ProfilePicture = userDetail.ProfilePicture;
                }
            }

            return View(rankings);
        }

    }
}
