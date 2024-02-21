using backend.DataAccess.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace backend.DataAccess.DataAccess
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Entry> Entries { get; set; }
        public DbSet<Node> Nodes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Node>()
                .HasKey(x => x.Id);

            builder.Entity<Entry>()
                .HasKey(e => e.Id);

            builder.Entity<Node>()
                .HasMany(n => n.Entries)
                .WithOne()
                .HasForeignKey(e => e.NodeId);
        }
    }
}
