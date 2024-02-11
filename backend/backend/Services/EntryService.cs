using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Services.Implementations
{
    public class EntryService
    {
        private readonly EntryRepository _entryRepository;
        private readonly NodeRepository _nodeRepository;

        public EntryService(EntryRepository entryRepository, NodeRepository nodeRepository)
        {
            _nodeRepository = nodeRepository;
            _entryRepository = entryRepository;
        }

        public IEnumerable<Entry> GetEntries()
        {
            return _entryRepository.GetEntries();
        }

        public bool RemoveEntry(int id) 
        { 
            return _entryRepository.DeleteEntry(id);
        }

        public int GetIdNodeByName(string childNodeName, string parentName)
        {
            var id = _nodeRepository.GetNodes().FirstOrDefault(node => node.Name == childNodeName && node.ParentName == parentName)?.Id;

            return id ?? -1;
        }

        public int AddEntry(EntryDTO newEntry) 
        {
            int NodeId = GetIdNodeByName(newEntry.ChildNodeName, newEntry.ParentName);
            var entry = new Entry()
            {
                Name = newEntry.Name,
                ParentName = newEntry.ChildNodeName,
                Type = newEntry.Type,
                Description = newEntry.Description,
                NodeId = NodeId
            };

            //добавляем запись и возвращаем id этой записи
            if (_entryRepository.AddEntry(entry))
            {
                return _entryRepository.GetEntries().FirstOrDefault(e => e.Name == entry.Name && e.ParentName == entry.ParentName).Id;
            }
            return -1;
        }
    }
}
