using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Winter_Project.Migrations
{
    /// <inheritdoc />
    public partial class profileupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "ProfilePicture",
                table: "Users",
                type: "BLOB",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NotificationModelUser_id",
                table: "UserBios",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ProfilePicture",
                table: "Notifications",
                type: "BLOB",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserBios_NotificationModelUser_id",
                table: "UserBios",
                column: "NotificationModelUser_id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBios_Notifications_NotificationModelUser_id",
                table: "UserBios",
                column: "NotificationModelUser_id",
                principalTable: "Notifications",
                principalColumn: "User_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBios_Notifications_NotificationModelUser_id",
                table: "UserBios");

            migrationBuilder.DropIndex(
                name: "IX_UserBios_NotificationModelUser_id",
                table: "UserBios");

            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NotificationModelUser_id",
                table: "UserBios");

            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "Notifications");
        }
    }
}
