using backend.DataAccess.DbPatterns.Interfaces;
using backend.DataAccess.Entity;
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
			foreach (var node in nodes)
			{
				node.Entries = (List<Entry>?)await UnitOfWork.Entries.GetAll(entry => entry.ParentName == node.Name);
			}
			return nodes;
		}

        public async Task<Node> AddNode(Node newNode) 
        {
            return await UnitOfWork.Nodes.Create(newNode);
        }

        public async Task RemoveNode(Node nodeToRemove)
        {
            await RemoveChildNodes(nodeToRemove.Name);
            await RemoveRelatedEntries(nodeToRemove.Name);

			var node = await UnitOfWork.Nodes.Get(node => node.Name == nodeToRemove.Name && node.ParentName == nodeToRemove.ParentName);
			await UnitOfWork.Nodes.Delete(node);
		}

        private async Task RemoveChildNodes(string parentName)
        {
			var childNodes = await UnitOfWork.Nodes.GetAll(node => node.ParentName == parentName);
			
            if (childNodes != null)
			{
				foreach (var node in childNodes)
				{
					await UnitOfWork.Nodes.Delete(node);
				}
			}
		}

		private async Task RemoveRelatedEntries(string parentName)
		{
			var relatedEntries = await UnitOfWork.Entries.GetAll(entry => entry.ParentName == parentName);

			if (relatedEntries != null)
			{
				foreach (var entry in relatedEntries)
				{
					await UnitOfWork.Entries.Delete(entry);
				}
			}
		}
	}
}
