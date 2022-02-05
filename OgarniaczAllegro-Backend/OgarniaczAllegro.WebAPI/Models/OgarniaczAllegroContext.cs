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

        public DbSet<Order> Orders{ get; set; }
        public DbSet<Status> Statuses{ get; set; }
        public DbSet<User> Users{ get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Order>()
                //.HasKey(o => o.Id)
                  //.HasRequired<Grade>(s => s.CurrentGrade)
                  //.HasOne<Status>(s => s.HasInvoice)
            //.WithMany(g => g.Students)
            //.HasForeignKey<int>(s => s.CurrentGradeId);

            //modelBuilder.Entity<Course>().ToTable("Course");
            //modelBuilder.Entity<Enrollment>().ToTable("Enrollment");
            //modelBuilder.Entity<Student>().ToTable("Student");
        }
    }
}