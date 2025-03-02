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
        public DbSet<ParticipantModel> Participants { get; set; }
        public DbSet<ChatMessageModel> ChatMessages { get; set; }
        public DbSet<NotificationModel> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ✅ แปลง DateOnly เป็น DateTime
            var dateOnlyConverter = new ValueConverter<DateOnly, DateTime>(
                dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),  // แปลง DateOnly → DateTime
                dateTime => DateOnly.FromDateTime(dateTime)          // แปลง DateTime → DateOnly
            );

            modelBuilder.Entity<ActivityModel>()
            .HasOne(a => a.Requirement) // ActivityModel has one RequirementModel
            .WithOne() // RequirementModel has one ActivityModel
            .HasForeignKey<RequirementModel>(r => r.Activity_id);

            modelBuilder.Entity<ParticipantModel>()
            .HasKey(p => new { p.Username, p.Activity_id });

            modelBuilder.Entity<ParticipantModel>()
            .HasOne<ActivityModel>()
            .WithMany(a => a.Participants)
            .HasForeignKey(p => p.Activity_id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
