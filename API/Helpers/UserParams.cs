namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        public string CurrentUsername { get; set; }

        public string Gender { get; set; }

        /// <summary>
        /// Minimum age (in years) of the member, inclusive.
        /// </summary>
        public int MinAge { get; set; } = 18;

        /// <summary>
        /// Maximum age (in years) of the member, inclusive.
        /// </summary>
        public int MaxAge { get; set; } = 100;

        public string OrderBy { get; set; } = "lastActive";
    }
}
