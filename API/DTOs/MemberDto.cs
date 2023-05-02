namespace API.DTOs
{
    /// <summary>
    /// DTO component used to Shape our Data; used as part of our "Object Cycle" solution.
    /// https://learn.microsoft.com/en-us/sql/ado/guide/data/data-shaping-overview
    /// https://learn.microsoft.com/en-us/ef/core/querying/related-data/serialization
    /// </summary>
    public class MemberDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        /// <summary>
        /// The member's main photo (users can have many photos, but should only have
        /// one photo designated as their "main photo").
        /// </summary>
        public string PhotoUrl { get; set; }

        /// <summary>
        /// How many years old this member is.
        /// </summary>
        public int Age { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public List<PhotoDto> Photos { get; set; }
    }
}
