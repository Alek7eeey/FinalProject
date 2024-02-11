using backend.Models;

namespace backend.Data
{
    public class EntryRepository
    {
        private readonly DBContext _context;

        public EntryRepository(DBContext context)
        {
            _context = context;
        }

        public List<Entry> GetEntries()
        {
            return _context.Entries.ToList();
        }

        public Entry? GetEntry(int id)
        {
            return _context.Entries.FirstOrDefault(e => e.Id == id);
        }

        public bool AddEntry(Entry entry)
        {
            try
            {
                _context.Entries.Add(entry);
                _context.SaveChanges();
                return true;
            }
            catch (Exception error) 
            {
                return false;
            }
        }

        public bool DeleteEntry(int id)
        {
            var entry = _context.Entries.FirstOrDefault(e => e.Id == id);
            if (entry != null)
            {
                _context.Entries.Remove(entry);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
