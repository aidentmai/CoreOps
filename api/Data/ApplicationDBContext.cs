using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {            
        }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }
        public DbSet<TeamMembership> TeamMemberships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TeamMembership>(x => x.HasKey(p => new { p.userId, p.teamId}));

            modelBuilder.Entity<TeamMembership>()
            .HasOne(u => u.User)
            .WithMany(t => t.Teams)
            .HasForeignKey(u => u.userId);

            modelBuilder.Entity<TeamMembership>()
            .HasOne(t => t.Team)
            .WithMany(t => t.TeamMembers)
            .HasForeignKey(t => t.teamId);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" }
            };
            
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}