﻿using Mental_Care_API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Mental_Care_API.DataAccess
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppointmentHistory>()
                .HasOne(a => a.Patient)
                .WithMany()
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<PsychologistDetails> PsychologistDetails { get; set; }
        public DbSet<Experience>Experiences { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Messages> Messages { get; set; }
        public DbSet<AppointmentHistory> AppointmentsHistory { get; set;}
        public DbSet<Record> Records { get; set; }

    }
}
