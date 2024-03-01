using backend.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace backend.DataAccess
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Entry> Entries { get; set; }
        public DbSet<Node> Nodes { get; set; }

        public DbSet<EntryFile> Files { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Node>()
                .HasKey(x => x.Id);

            builder.Entity<Entry>()
                .HasKey(e => e.Id);

            builder.Entity<EntryFile>()
                .HasKey(x => x.Id);

			builder.Entity<Node>()
	            .HasMany(n => n.Entries)
	            .WithOne()
	            .HasForeignKey(e => e.NodeId);

			builder.Entity<Entry>()
	            .HasOne(n => n.File)
	            .WithOne(f => f.Entry)
	            .HasForeignKey<EntryFile>(f => f.EntryId);
		}
	}
}
