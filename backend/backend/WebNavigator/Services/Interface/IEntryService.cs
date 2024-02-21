using backend.DataAccess.DataAccess.Entity;
using backend.DTO;

namespace backend.WebNavigator.Services.Interface
{
    public interface IEntryService
    {
        public Task<IEnumerable<Entry>> GetEntries();

        public Task<Entry> RemoveEntry(Entry entry);

        public Task<int?> GetIdNodeByName(string childNodeName, string parentName);

        public Task<Entry> AddEntry(EntryFromServer newEntry);
    }
}
