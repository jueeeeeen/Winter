using Microsoft.EntityFrameworkCore;

namespace Winter_Project.Models
{
    public class WinterContext : DbContext
    {
        public WinterContext(DbContextOptions<WinterContext> options)
            : base(options) // ส่ง options ไปยัง base class (DbContext)
        {
        }

        public DbSet<UserModel> Users { get; set; }
    }
}
