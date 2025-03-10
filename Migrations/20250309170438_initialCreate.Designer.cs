﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Winter_Project.Models;

#nullable disable

namespace Winter_Project.Migrations
{
    [DbContext(typeof(WinterContext))]
    [Migration("20250309170438_initialCreate")]
    partial class initialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.2");

            modelBuilder.Entity("Winter_Project.Models.ActivityModel", b =>
                {
                    b.Property<int>("Activity_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Activity_time")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("Approval")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Create_time")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Deadline_time")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Detail")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Duration")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Max_member")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Owner")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("Tags")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Activity_id");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("Winter_Project.Models.ChatMessageModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Activity_id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("Winter_Project.Models.NotificationModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Activity_id")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Activity_user_id")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Notification_time")
                        .HasColumnType("TEXT");

                    b.Property<string>("Notification_type")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("User_id")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("Winter_Project.Models.ParticipantModel", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("TEXT")
                        .HasColumnOrder(0);

                    b.Property<int>("Activity_id")
                        .HasColumnType("INTEGER")
                        .HasColumnOrder(1);

                    b.Property<DateTime>("Join_time")
                        .HasColumnType("TEXT");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Username", "Activity_id");

                    b.HasIndex("Activity_id");

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("Winter_Project.Models.RequirementModel", b =>
                {
                    b.Property<int>("Requirement_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Activity_id")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Age")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Other")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Requirement_id");

                    b.HasIndex("Activity_id")
                        .IsUnique();

                    b.ToTable("Requirements");
                });

            modelBuilder.Entity("Winter_Project.Models.ReviewModel", b =>
                {
                    b.Property<int>("Review_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Activity_id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<float>("Rating")
                        .HasColumnType("REAL");

                    b.Property<string>("Reviewed_user")
                        .HasColumnType("TEXT");

                    b.Property<string>("Reviewer")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Time")
                        .HasColumnType("TEXT");

                    b.HasKey("Review_id");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Winter_Project.Models.UserBio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AboutMe")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MyHobby")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MyInterests")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserBios");
                });

            modelBuilder.Entity("Winter_Project.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("ProfilePicture")
                        .HasColumnType("BLOB");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Winter_Project.Models.ParticipantModel", b =>
                {
                    b.HasOne("Winter_Project.Models.ActivityModel", null)
                        .WithMany("Participants")
                        .HasForeignKey("Activity_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Winter_Project.Models.RequirementModel", b =>
                {
                    b.HasOne("Winter_Project.Models.ActivityModel", null)
                        .WithOne("Requirement")
                        .HasForeignKey("Winter_Project.Models.RequirementModel", "Activity_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Winter_Project.Models.UserBio", b =>
                {
                    b.HasOne("Winter_Project.Models.UserModel", "User")
                        .WithMany("UserBios")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Winter_Project.Models.ActivityModel", b =>
                {
                    b.Navigation("Participants");

                    b.Navigation("Requirement")
                        .IsRequired();
                });

            modelBuilder.Entity("Winter_Project.Models.UserModel", b =>
                {
                    b.Navigation("UserBios");
                });
#pragma warning restore 612, 618
        }
    }
}
