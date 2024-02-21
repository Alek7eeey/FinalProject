using backend.DataAccess.DataAccess.DbPatterns.Interfaces;
using backend.DataAccess.DataAccess.Entity;
using backend.DTO;
using backend.WebNavigator.Services.Interface;

namespace backend.WebNavigator.Services.Service
{
    public class EntryService : ServiceConstructor, IEntryService
    {
        public EntryService(IUnitOfWork unitOfWork) : base(unitOfWork) 
        {
            
        } 
        public async Task<IEnumerable<Entry>> GetEntries()
        {
            return await UnitOfWork.Entries.GetAll();
        }

        public Task<Entry> RemoveEntry(Entry entry)
        {
            return UnitOfWork.Entries.Delete(entry);
        }

        public async Task<int?> GetIdNodeByName(string childNodeName, string parentName)
        {
            var allNodes = await UnitOfWork.Nodes.GetAll();
            return allNodes.FirstOrDefault(entry => entry.Name == childNodeName && entry.ParentName == parentName)?.Id;
        }

        public async Task<Entry> AddEntry(EntryFromServer newEntry)
        {
            var NodeId = await GetIdNodeByName(newEntry.ChildNodeName, newEntry.ParentName);
            var entry = new Entry()
            {
                Name = newEntry.Name,
                ParentName = newEntry.ChildNodeName,
                Type = newEntry.Type,
                Description = newEntry.Description,
                NodeId = (int)NodeId
            };

            return await UnitOfWork.Entries.Create(entry);
        }
    }
}
