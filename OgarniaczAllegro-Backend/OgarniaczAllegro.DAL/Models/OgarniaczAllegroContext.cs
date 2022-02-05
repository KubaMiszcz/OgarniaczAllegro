using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OgarniaczAllegro.DAL.Models;

namespace OgarniaczAllegro.DAL
{
    public class OgarniaczAllegroContext : DbContext
    {
        public OgarniaczAllegroContext(DbContextOptions<OgarniaczAllegroContext> options) : base(options)
        {

        }

        public DbSet<Status> Statuses{ get; set; }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Course>().ToTable("Course");
        //    modelBuilder.Entity<Enrollment>().ToTable("Enrollment");
        //    modelBuilder.Entity<Student>().ToTable("Student");
        //}
    }
}