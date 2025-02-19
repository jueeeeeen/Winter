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
        public DbSet<ActivityModel> Activities { get; set; }

        public DbSet<RequirementModel> Requirements { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ✅ แปลง DateOnly เป็น DateTime
            var dateOnlyConverter = new ValueConverter<DateOnly, DateTime>(
                dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),  // แปลง DateOnly → DateTime
                dateTime => DateOnly.FromDateTime(dateTime)          // แปลง DateTime → DateOnly
            );

        // กำหนดความสัมพันธ์ One-to-One ระหว่าง ActivityModel และ RequirementModel
            modelBuilder.Entity<ActivityModel>()
                .HasOne(a => a.Requirement) // ActivityModel มี RequirementModel
                .WithOne(r => r.Activity)   // RequirementModel มี ActivityModel
                .HasForeignKey<RequirementModel>(r => r.Activity_id); // กำหนด Activity_id เป็น Foreign Key
        }
    }
}
