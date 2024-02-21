using backend.DataAccess.DataAccess.DbPatterns.Interfaces;
using backend.DataAccess.DataAccess.Entity;
using backend.WebNavigator.Services.Interface;

namespace backend.WebNavigator.Services.Service
{
    public class NodeService : ServiceConstructor, INodeService
    {
        public NodeService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public async Task<IEnumerable<Node>> GetNodes()
        {
            var nodes = await UnitOfWork.Nodes.GetAll();
            var entries = await UnitOfWork.Entries.GetAll();

            foreach (var node in nodes)
            {
                node.Entries = entries.Where(entry => entry.ParentName == node.Name).ToList();
            }

            return nodes;
        }

        public async Task<Node> AddNode(Node newNode) 
        {
            return await UnitOfWork.Nodes.Create(newNode);
        }

        public async Task<Node> RemoveNode(Node nodeToRemove)
        {
            await RemoveChildNodes(nodeToRemove.Name);
            await RemoveRelatedEntries(nodeToRemove.Name);
            var nodes = await UnitOfWork.Nodes.GetAll();
            var node = nodes.FirstOrDefault(node => node.Name == nodeToRemove.Name && node.ParentName == nodeToRemove.ParentName);
            
            return await UnitOfWork.Nodes.Delete(node);
        }

        private async Task RemoveChildNodes(string parentName)
        {
            var nodes = await UnitOfWork.Nodes.GetAll();
            var childNodes = nodes.Where(node => node.ParentName == parentName);

            foreach (var node in childNodes)
            {
                await UnitOfWork.Nodes.Delete(node);
            }
        }

        private async Task RemoveRelatedEntries(string parentName)
        {
            var entries = await UnitOfWork.Entries.GetAll();
            var relatedEntries = entries.Where(entry => entry.ParentName == parentName);

            foreach (var entry in relatedEntries)
            {
                await UnitOfWork.Entries.Delete(entry);
            }
        }
    }
}
