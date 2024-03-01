using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class EntryFromClient
    {
        public EntryFromClient() { }
        public EntryFromClient(string name, string type, string description, string parentName, string childNodeName) 
        {
            Name = name;
            Type = type;
            Description = description;
            ParentName = parentName;
            ChildNodeName = childNodeName;
        }

        [Required]
        [MaxLength(150, ErrorMessage = "Name is too long")]
        public string Name { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        [MaxLength(150, ErrorMessage = "Parent name is too long")]
        public string ParentName { get; set; }
        [Required]
        [MaxLength(150, ErrorMessage = "Parent name is too long")]
        public string ChildNodeName { get; set; }

        [Required]
        [MaxLength(300, ErrorMessage = "Description is too long")]
        public string Description { get; set; }
    }
}
