using backend.DataAccess.DbPatterns.Interfaces;
using backend.DataAccess.Entity;
using backend.WebNavigator.DTO;
using backend.WebNavigator.Services.Interface;

namespace backend.WebNavigator.Services.Service
{
	public class EntryFileService : ServiceConstructor, IEntryFileService
	{
		public EntryFileService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

		public async Task AddContentToEntry(EntryFileFromClient entryFileFromClient)
		{
			var newEntryFile = new EntryFile()
			{
				FileName = entryFileFromClient.NameFile,
				FileType = entryFileFromClient.FileType,
				Content = entryFileFromClient.Content,
				EntryId = entryFileFromClient.EntryId
			};

			await UnitOfWork.Files.Create(newEntryFile);
		}

		public async Task<EntryFile?> GetEntryFile(int entryId)
		{
			return await UnitOfWork.Files.Get(file => file.EntryId == entryId);
		}
	}
}
