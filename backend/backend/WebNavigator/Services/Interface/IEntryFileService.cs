using backend.DataAccess.DbPatterns;
using backend.DataAccess.Entity;
using backend.WebNavigator.DTO;

namespace backend.WebNavigator.Services.Interface
{
	public interface IEntryFileService
	{
		public Task AddContentToEntry(EntryFileFromClient entryFileFromClient);
		public Task<EntryFile?> GetEntryFile(int entryId);
	}
}
