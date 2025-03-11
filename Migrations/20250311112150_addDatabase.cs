using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Winter_Project.Migrations
{
    /// <inheritdoc />
    public partial class addDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Activity_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Owner = table.Column<string>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Detail = table.Column<string>(type: "TEXT", nullable: false),
                    Create_time = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Activity_time = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Deadline_time = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Duration = table.Column<string>(type: "TEXT", nullable: false),
                    Location = table.Column<string>(type: "TEXT", nullable: false),
                    Max_member = table.Column<int>(type: "INTEGER", nullable: false),
                    Approval = table.Column<bool>(type: "INTEGER", nullable: false),
                    Tags = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Activity_id);
                });

            migrationBuilder.CreateTable(
                name: "ChatMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Activity_id = table.Column<int>(type: "INTEGER", nullable: false),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Message = table.Column<string>(type: "TEXT", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    User_id = table.Column<int>(type: "INTEGER", nullable: false),
                    Notification_type = table.Column<string>(type: "TEXT", nullable: false),
                    Activity_id = table.Column<int>(type: "INTEGER", nullable: false),
                    Activity_user_id = table.Column<int>(type: "INTEGER", nullable: false),
                    Notification_time = table.Column<DateTime>(type: "TEXT", nullable: false),
                    New = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Review_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Reviewer = table.Column<string>(type: "TEXT", nullable: true),
                    Reviewed_user = table.Column<string>(type: "TEXT", nullable: true),
                    Activity_id = table.Column<int>(type: "INTEGER", nullable: false),
                    Rating = table.Column<float>(type: "REAL", nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: false),
                    Time = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Review_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", nullable: false),
                    ProfilePicture = table.Column<byte[]>(type: "BLOB", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Participants",
                columns: table => new
                {
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Activity_id = table.Column<int>(type: "INTEGER", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    Join_time = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participants", x => new { x.Username, x.Activity_id });
                    table.ForeignKey(
                        name: "FK_Participants_Activities_Activity_id",
                        column: x => x.Activity_id,
                        principalTable: "Activities",
                        principalColumn: "Activity_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Requirements",
                columns: table => new
                {
                    Requirement_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Activity_id = table.Column<int>(type: "INTEGER", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", nullable: false),
                    Age = table.Column<int>(type: "INTEGER", nullable: false),
                    Other = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requirements", x => x.Requirement_id);
                    table.ForeignKey(
                        name: "FK_Requirements_Activities_Activity_id",
                        column: x => x.Activity_id,
                        principalTable: "Activities",
                        principalColumn: "Activity_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    FriendId = table.Column<int>(type: "INTEGER", nullable: false),
                    IsFriend = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsPending = table.Column<bool>(type: "INTEGER", nullable: false),
                    time = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => new { x.UserId, x.FriendId });
                    table.ForeignKey(
                        name: "FK_Friends_Users_FriendId",
                        column: x => x.FriendId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Friends_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Bio = table.Column<string>(type: "TEXT", nullable: false),
                    Location = table.Column<string>(type: "TEXT", nullable: false),
                    Phone = table.Column<string>(type: "TEXT", nullable: false),
                    AboutMe = table.Column<string>(type: "TEXT", nullable: false),
                    MyInterests = table.Column<string>(type: "TEXT", nullable: false),
                    MyHobby = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBios_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "Review_id", "Activity_id", "Comment", "Rating", "Reviewed_user", "Reviewer", "Time" },
                values: new object[,]
                {
                    { 1, 101, "Great!", 4.5f, "Alice", "UserA", new DateTime(2024, 1, 1, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 102, "Excellent!", 5f, "Alice", "UserB", new DateTime(2024, 1, 2, 15, 30, 0, 0, DateTimeKind.Unspecified) },
                    { 3, 103, "Good job", 3.8f, "Bob", "UserC", new DateTime(2024, 1, 3, 10, 45, 0, 0, DateTimeKind.Unspecified) },
                    { 4, 104, "Needs improvement", 2.5f, "Charlie", "UserD", new DateTime(2024, 1, 4, 18, 20, 0, 0, DateTimeKind.Unspecified) },
                    { 5, 105, "Nice work", 4.2f, "Bob", "UserE", new DateTime(2024, 1, 5, 8, 10, 0, 0, DateTimeKind.Unspecified) },
                    { 6, 106, "Average", 3.5f, "Charlie", "UserF", new DateTime(2024, 1, 6, 11, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, 107, "Amazing!", 4.8f, "Alice", "UserG", new DateTime(2024, 1, 7, 9, 25, 0, 0, DateTimeKind.Unspecified) },
                    { 8, 108, "Pretty good", 3.9f, "Bob", "UserH", new DateTime(2024, 1, 8, 16, 55, 0, 0, DateTimeKind.Unspecified) },
                    { 9, 109, "Could be better", 2f, "Charlie", "UserI", new DateTime(2024, 1, 9, 13, 5, 0, 0, DateTimeKind.Unspecified) },
                    { 10, 110, "Nice!", 4.2f, "Alice", "UserJ", new DateTime(2024, 1, 10, 20, 30, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DateOfBirth", "Email", "FirstName", "Gender", "LastName", "PasswordHash", "ProfilePicture", "Username" },
                values: new object[] { 1, new DateOnly(1995, 6, 15), "john@example.com", "John", "male", "Doe", "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=", null, "test1" });

            migrationBuilder.InsertData(
                table: "UserBios",
                columns: new[] { "Id", "AboutMe", "Bio", "Location", "MyHobby", "MyInterests", "Phone", "UserId" },
                values: new object[] { 1, "I enjoy storytelling and writing about various topics.", "Creative writer and avid reader.", "Los Angeles, USA", "Painting, Traveling", "Writing, Art, Literature", "+1-555-5678", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Friends_FriendId",
                table: "Friends",
                column: "FriendId");

            migrationBuilder.CreateIndex(
                name: "IX_Participants_Activity_id",
                table: "Participants",
                column: "Activity_id");

            migrationBuilder.CreateIndex(
                name: "IX_Requirements_Activity_id",
                table: "Requirements",
                column: "Activity_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserBios_UserId",
                table: "UserBios",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatMessages");

            migrationBuilder.DropTable(
                name: "Friends");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Participants");

            migrationBuilder.DropTable(
                name: "Requirements");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "UserBios");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
