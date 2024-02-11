using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class EntryDTO
    {
        public EntryDTO() { }
        public EntryDTO(string name, string type, string description, string parentName, string childNodeName) 
        {
            Name = name;
            Type = type;
            Description = description;
            ParentName = parentName;
            ChildNodeName = childNodeName;
        }
        [MinLength(1)]
        public string Name { get; set; }
        [MinLength(1)]
        public string Type { get; set; }
        [MinLength(1)]
        public string ParentName { get; set; }
        [MinLength(1)]
        public string ChildNodeName { get; set; }
        [MinLength(1)]
        public string Description { get; set; }
    }
}
