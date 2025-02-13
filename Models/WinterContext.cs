using Microsoft.EntityFrameworkCore;

namespace Winter_Project.Models
{
    public class WinterContext : DbContext
    {
        public DbSet<UserModel> Users {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            =>options.UseSqlite(@"Data Source=database.db");
    }
}