using backend.DataAccess.Entity;

namespace backend.WebNavigator.Services.Interface
{
    public interface INodeService
    {
        public Task<IEnumerable<Node>> GetNodes();

        public Task<Node> AddNode(Node newNode);

        public Task RemoveNode(Node nodeToRemove);
    }
}
