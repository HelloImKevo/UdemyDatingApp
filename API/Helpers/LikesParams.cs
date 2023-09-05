namespace API.Helpers
{
    //
    // Summary:
    //     [predicate] - Do you want to get the user they have "Liked", 
    //     or the user they are "Liked By".
    public class LikesParams : PaginationParams
    {
        public int UserId { get; set; }

        public string Predicate { get; set; }
    }
}
