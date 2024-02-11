using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Services.Implementations
{
    public class NodeService
    {
        private readonly NodeRepository _nodeRepository;
        private readonly EntryService _entryService;
        public NodeService(NodeRepository nodeRepository, EntryService entryService)
        {
            _nodeRepository = nodeRepository;
            _entryService = entryService;
        }

        public IEnumerable<Node> GetNodes()
        {
            var nodes = _nodeRepository.GetNodes();
            var entries = _entryService.GetEntries();

            //возврат узлов с набором записей для каждого
            foreach (var node in nodes)
            {
                node.Entries = entries.Where(entry => entry.ParentName == node.Name).ToList();
            }

            return nodes;
        }


        public bool AddNode(Node newNode)
        {
            return _nodeRepository.AddNode(newNode);
        }

        public bool RemoveNode(Node nodeToRemove)
        {
            var id = _nodeRepository.GetNodes().FirstOrDefault(node => node.Name == nodeToRemove.Name)?.Id;

            if (id == null)
            {
                return false;
            }

            _nodeRepository.DeleteNode((int)id);
            RemoveChildNodes(nodeToRemove.Name);
            RemoveRelatedEntries(nodeToRemove.Name);

            return true;
        }

        private void RemoveChildNodes(string parentName)
        {
            var childNodes = _nodeRepository.GetNodes().Where(node => node.ParentName == parentName);

            foreach (var node in childNodes)
            {
                _nodeRepository.DeleteNode(node.Id);
            }
        }

        private void RemoveRelatedEntries(string parentName)
        {
            var relatedEntries = _entryService.GetEntries().Where(entry => entry.ParentName == parentName);

            foreach (var entry in relatedEntries)
            {
                _entryService.RemoveEntry((int)entry.Id);
            }
        }

    }
}
