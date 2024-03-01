using backend.DataAccess.Entity;

namespace backend.DataAccess.DbPatterns.Interfaces
{
    public interface IUnitOfWork
    {
        IGenericRepository<Node> Nodes { get; }
        IGenericRepository<Entry> Entries { get; }
        IGenericRepository<EntryFile> Files { get; }
    }
}