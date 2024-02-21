
namespace backend.DataAccess.DataAccess.DbPatterns.Interfaces
{
    public interface IGenericRepository<T>
    {
        Task<T> Create(T t);
        Task<T> Delete(T t);
        Task Update(T t);
        Task<T> Get(int id);
        Task<IList<T>> GetAll();
    }
}
