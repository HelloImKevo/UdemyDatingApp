namespace API.DTOs
{
    //
    // Summary:
    //     Lightweight version of the [AppUser] with a reduced number of
    //     properties, for the intent of being displayed in a "List of Likes".
    //
    // Remarks:
    //     See ILikesRepository for more details.
    public class LikeDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public int Age { get; set; }

        public string KnownAs { get; set; }

        public string PhotoUrl { get; set; }

        public string City { get; set; }
    }
}
