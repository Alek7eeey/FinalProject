using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.DataAccess.Entity
{
	public class EntryFile
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[Required]
		[MaxLength(100, ErrorMessage = "Name is too long")]
		public string FileName { get; set; }

		[Required]
		[MaxLength(20, ErrorMessage = "Type is too long")]
		public string FileType { get; set; }

		[Required]
		public byte[] Content { get; set; }

		[Required]
		public int EntryId { get; set; }

		[ForeignKey("EntryId")]
		public Entry Entry { get; set; }
	}
}
