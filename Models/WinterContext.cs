using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Winter_Project.Models
{
    public class WinterContext : DbContext
    {
        public WinterContext(DbContextOptions<WinterContext> options)
            : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<UserBio> UserBios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ✅ แปลง DateOnly เป็น DateTime
            var dateOnlyConverter = new ValueConverter<DateOnly, DateTime>(
                dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),  // แปลง DateOnly → DateTime
                dateTime => DateOnly.FromDateTime(dateTime)          // แปลง DateTime → DateOnly
            );

            modelBuilder.Entity<UserModel>()
                .Property(u => u.DateOfBirth)
                .HasConversion(dateOnlyConverter);  // ใช้ Value Converter
        }
    }
}
