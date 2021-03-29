using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore
{
    public interface IAsyncRepository<T> where T: BaseEntity, IAggregateRoot
    {
        Task<T> GetAsyncById(int id);
        Task<IEnumerable<T>> ListAllAsync();

        Task<T> AddAsync(T entity);

        Task<int> UpdateAsync(T entity);

        Task<int> DeleteCollection(T entity);
    }
}
