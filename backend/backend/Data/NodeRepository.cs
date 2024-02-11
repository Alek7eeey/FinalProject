using backend.Models;

namespace backend.Data
{
    public class NodeRepository
    {
        private readonly DBContext _dbContext;
        public NodeRepository(DBContext dBContext) 
        { 
            _dbContext = dBContext;
        }

        public IEnumerable<Node> GetNodes() 
        { 
            return _dbContext.Nodes.ToList();
        }
        public Node GetNode(int id)
        {
            return _dbContext.Nodes.FirstOrDefault(n => n.Id == id);
        }

        public bool AddNode(Node node)
        {
            try
            {
                _dbContext.Nodes.Add(node);
                _dbContext.SaveChanges();
                return true;
            }
            catch 
            {
                return false;
            }

        }

        public bool DeleteNode(int id)
        {
            var node = _dbContext.Nodes.FirstOrDefault(n => n.Id == id);
            if (node != null)
            {
                _dbContext.Nodes.Remove(node);
                _dbContext.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
