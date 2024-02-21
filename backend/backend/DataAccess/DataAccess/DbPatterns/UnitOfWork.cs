using backend.DataAccess.DataAccess.DbPatterns.Interfaces;
using backend.DataAccess.DataAccess.Entity;

namespace backend.DataAccess.DataAccess.DbPatterns
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

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
