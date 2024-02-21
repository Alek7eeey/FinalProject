using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class NodeFromServer
    {
        public NodeFromServer() { }
        public NodeFromServer(string name, string type, string parentName)
        {
            Name = name;
            Type = type;
            ParentName = parentName;
        }

        [Required]
        [MaxLength(150, ErrorMessage = "Name is too long")]
        public string Name { get; set; }

        [Required]
        public string Type { get; set; }
        
        [Required]
        [MaxLength(150, ErrorMessage = "Parent name is too long")]
        public string ParentName { get; set; }
    }
}
