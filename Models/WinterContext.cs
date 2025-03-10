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
        public DbSet<ReviewModel> Reviews { get; set; }
        public DbSet<ChatMessageModel> ChatMessages { get; set; }
        public DbSet<NotificationModel> Notifications { get; set; }
        public DbSet<FriendModel> Friends { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ✅ แปลง DateOnly เป็น DateTime
            var dateOnlyConverter = new ValueConverter<DateOnly, DateTime>(
                dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),  // แปลง DateOnly → DateTime
                dateTime => DateOnly.FromDateTime(dateTime)          // แปลง DateTime → DateOnly
            );

            // การตั้งค่า Composite Key สำหรับ FriendModel
            modelBuilder.Entity<FriendModel>()
                .HasKey(f => new { f.UserId, f.FriendId }); // กำหนดว่า UserId และ FriendId เป็น Composite Key

            // การตั้งค่าความสัมพันธ์ระหว่าง UserModel กับ FriendModel
            modelBuilder.Entity<FriendModel>()
                .HasOne<UserModel>()   // FriendModel เชื่อมโยงกับ UserModel
                .WithMany()            // UserModel สามารถมีเพื่อนหลายคนได้
                .HasForeignKey(f => f.UserId);  // การตั้งค่าคีย์ผูก (foreign key)

            modelBuilder.Entity<FriendModel>()
                .HasOne<UserModel>()   // FriendModel เชื่อมโยงกับ UserModel (ในฐานะเพื่อน)
                .WithMany()            // UserModel สามารถมีเพื่อนหลายคนได้
                .HasForeignKey(f => f.FriendId); // การตั้งค่าคีย์ผูก (foreign key) สำหรับ FriendId

            // ตั้งค่าความสัมพันธ์ระหว่าง ActivityModel และ RequirementModel
            modelBuilder.Entity<ActivityModel>()
                .HasOne(a => a.Requirement) // ActivityModel has one RequirementModel
                .WithOne() // RequirementModel has one ActivityModel
                .HasForeignKey<RequirementModel>(r => r.Activity_id);

            // การตั้งค่าคีย์ผสม (Composite Key) สำหรับ ParticipantModel
            modelBuilder.Entity<ParticipantModel>()
                .HasKey(p => new { p.Username, p.Activity_id });

            modelBuilder.Entity<ParticipantModel>()
                .HasOne<ActivityModel>()
                .WithMany(a => a.Participants)
                .HasForeignKey(p => p.Activity_id);

            base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<ReviewModel>().HasData(
        new ReviewModel { Review_id = 1, Reviewer = "UserA", Reviewed_user = "Alice", Activity_id = 101, Rating = 4.5f, Comment = "Great!", Time = new DateTime(2024, 1, 1, 12, 0, 0) },
        new ReviewModel { Review_id = 2, Reviewer = "UserB", Reviewed_user = "Alice", Activity_id = 102, Rating = 5.0f, Comment = "Excellent!", Time = new DateTime(2024, 1, 2, 15, 30, 0) },
        new ReviewModel { Review_id = 3, Reviewer = "UserC", Reviewed_user = "Bob", Activity_id = 103, Rating = 3.8f, Comment = "Good job", Time = new DateTime(2024, 1, 3, 10, 45, 0) },
        new ReviewModel { Review_id = 4, Reviewer = "UserD", Reviewed_user = "Charlie", Activity_id = 104, Rating = 2.5f, Comment = "Needs improvement", Time = new DateTime(2024, 1, 4, 18, 20, 0) },
        new ReviewModel { Review_id = 5, Reviewer = "UserE", Reviewed_user = "Bob", Activity_id = 105, Rating = 4.2f, Comment = "Nice work", Time = new DateTime(2024, 1, 5, 8, 10, 0) },
        new ReviewModel { Review_id = 6, Reviewer = "UserF", Reviewed_user = "Charlie", Activity_id = 106, Rating = 3.5f, Comment = "Average", Time = new DateTime(2024, 1, 6, 11, 0, 0) },
        new ReviewModel { Review_id = 7, Reviewer = "UserG", Reviewed_user = "Alice", Activity_id = 107, Rating = 4.8f, Comment = "Amazing!", Time = new DateTime(2024, 1, 7, 9, 25, 0) },
        new ReviewModel { Review_id = 8, Reviewer = "UserH", Reviewed_user = "Bob", Activity_id = 108, Rating = 3.9f, Comment = "Pretty good", Time = new DateTime(2024, 1, 8, 16, 55, 0) },
        new ReviewModel { Review_id = 9, Reviewer = "UserI", Reviewed_user = "Charlie", Activity_id = 109, Rating = 2.0f, Comment = "Could be better", Time = new DateTime(2024, 1, 9, 13, 5, 0) },
        new ReviewModel { Review_id = 10, Reviewer = "UserJ", Reviewed_user = "Alice", Activity_id = 110, Rating = 4.2f, Comment = "Nice!", Time = new DateTime(2024, 1, 10, 20, 30, 0) }
    );
        }
    }
}
