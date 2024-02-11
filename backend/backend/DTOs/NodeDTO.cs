using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class NodeDTO
    {
        public NodeDTO() { }
        public NodeDTO(string name, string type, string parentName)
        {
            Name = name;
            Type = type;
            ParentName = parentName;
        }

        [MinLength(1)]
        public string Name { get; set; }
        
        [MinLength(1)]
        public string Type { get; set; }
        [MinLength(1)]
        public string ParentName { get; set; }
    }
}
