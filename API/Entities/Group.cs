using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Group
    {
        // Need an empty constructor for Entity Framework.
        public Group()
        {
        }

        public Group(string name)
        {
            Name = name;
        }

        [Key]
        public string Name { get; set; }

        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}
