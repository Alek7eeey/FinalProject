using backend.DataAccess.DbPatterns.Interfaces;
using backend.DataAccess.Entity;

namespace backend.DataAccess.DbPatterns
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DBContext _context;

        public UnitOfWork(DBContext context)
        {
            _context = context;
        }

        public IGenericRepository<Node> Nodes => new GenericRepository<Node>(_context);

        public IGenericRepository<Entry> Entries => new GenericRepository<Entry>(_context);

        public IGenericRepository<EntryFile> Files => new GenericRepository<EntryFile>(_context);

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
