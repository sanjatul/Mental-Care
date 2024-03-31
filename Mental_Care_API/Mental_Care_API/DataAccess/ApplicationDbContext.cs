using Mental_Care_API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Mental_Care_API.DataAccess
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<PsychologistDetails> PsychologistDetails { get; set; }
        public DbSet<Experience>Experiences { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Blog> Blogs { get; set; }
    }
}
