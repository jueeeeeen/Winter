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

        modelBuilder.Entity<UserModel>().HasData(
            new UserModel {
                Id = 1,
                Username = "test1",
                Email = "john@example.com",
                PasswordHash = "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
                FirstName = "John",
                LastName = "Doe",
                DateOfBirth = new DateOnly(1995, 6, 15),
                Gender = "male",
                ProfilePicture = null
            },
                        new UserModel {
                Id = 2,
                Username = "test2",
                Email = "jane@example.com",
                PasswordHash = "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
                FirstName = "Jane",
                LastName = "Doe",
                DateOfBirth = new DateOnly(1995, 6, 15),
                Gender = "female",
                ProfilePicture = null
            }
        );

        modelBuilder.Entity<UserBio>().HasData(
            new UserBio {
                Id = 1,
                UserId = 1,
                Bio = "Creative writer and avid reader.",
                Location = "Los Angeles, USA",
                Phone = "+1-555-5678",
                AboutMe = "I enjoy storytelling and writing about various topics.",
                MyInterests = "Writing, Art, Literature",
                MyHobby = "Painting, Traveling"
            },
            new UserBio {
                Id = 2,
                UserId = 2,
                Bio = "Creative writer and avid reader.",
                Location = "Los Angeles, USA",
                Phone = "+1-555-5678",
                AboutMe = "I enjoy storytelling and writing about various topics.",
                MyInterests = "Writing, Art, Literature",
                MyHobby = "Painting, Traveling"
            }
        );
        }
    }
}
