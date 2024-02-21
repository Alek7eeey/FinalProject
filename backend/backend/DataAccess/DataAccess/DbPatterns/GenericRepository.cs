using backend.DataAccess.DataAccess.DbPatterns.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.DataAccess.DataAccess.DbPatterns
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DBContext _context;

        public GenericRepository(DBContext context)
        {
            _context = context;
        }

        public async Task<T> Create(T t)
        {
            _context.Set<T>().Add(t);
            await _context.SaveChangesAsync();
            return t;
        }

        public async Task<T> Delete(T t)
        {
            _context.Set<T>().Remove(t);
            await _context.SaveChangesAsync();
            return t;
        }

        public async Task<T> Get(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IList<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task Update(T t)
        {
            _context.Set<T>().Update(t);
            await _context.SaveChangesAsync();
        }
    }
}
