namespace backend.WebNavigator.DTO
{
	public class EntryFileFromClient
	{
		public EntryFileFromClient() { }
		public EntryFileFromClient(string nameFile, string fileType, byte[] content, int nodeId) 
		{ 
			NameFile = nameFile;
			FileType = fileType;
			Content = content;
			EntryId = nodeId;
		}
		public string NameFile { get; set; }
		public string FileType { get; set; }

		public byte[] Content { get; set; }

		public int EntryId { get; set; }
	}
}
