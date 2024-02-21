using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.DataAccess.DataAccess.Entity
{
    public class Entry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        [MaxLength(150, ErrorMessage = "Name is too long")]
        public string Name { get; set; }

        [Required]
        [MaxLength(300, ErrorMessage = "Description is too long")]
        public string Description { get; set; }

        [Required]
        [MaxLength(150, ErrorMessage = "Parent name is too long")]
        public string ParentName { get; set; }

        [Required]
        [ForeignKey("Node")]
        public int NodeId { get; set; }
    }
}
