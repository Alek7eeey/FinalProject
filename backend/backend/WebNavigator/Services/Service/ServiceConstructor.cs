using backend.DataAccess.DbPatterns.Interfaces;

namespace backend.WebNavigator.Services.Service
{
    public class ServiceConstructor
    {
        protected IUnitOfWork UnitOfWork;

        protected ServiceConstructor(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }
    }
}