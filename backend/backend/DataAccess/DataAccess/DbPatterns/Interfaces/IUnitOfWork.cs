using backend.DataAccess.DataAccess.Entity;

namespace backend.DataAccess.DataAccess.DbPatterns.Interfaces
{
    public interface IUnitOfWork
    {
        IGenericRepository<Node> Nodes { get; }
        IGenericRepository<Entry> Entries { get; }
    }
}