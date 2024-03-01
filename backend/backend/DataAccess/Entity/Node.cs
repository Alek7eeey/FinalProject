using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.DataAccess.Entity
{
    public class Node
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(150, ErrorMessage = "Name is too long")]
        public string Name { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        [MaxLength(150, ErrorMessage = "Parent name is too long")]
        public string ParentName { get; set; }

        public List<Entry>? Entries { get; set; }
    }
}
