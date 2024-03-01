using System.Linq.Expressions;

namespace backend.DataAccess.DbPatterns.Interfaces
{
    public interface IGenericRepository<T>
    {
        Task<T> Create(T t);
        Task<T> Delete(T t);
        Task Update(T t);
        Task<T> Get(int id);
        Task<T> Get(Expression<Func<T, bool>> predicate);
		Task<IList<T>> GetAll();
        Task<IList<T>> GetAll(Expression<Func<T, bool>> predicate);

	}
}
