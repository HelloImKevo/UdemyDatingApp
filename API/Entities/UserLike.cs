namespace API.Entities
{
    //
    // Summary:
    //     Represents a User that the [SourceUser] "Likes".
    //
    // Remarks:
    //     See DataContext.GetLikes() for more details.
    public class UserLike
    {
        public AppUser SourceUser { get; set; }

        public int SourceUserId { get; set; }

        public AppUser TargetUser { get; set; }

        public int TargetUserId { get; set; }

        public List<UserLike> LikedByUsers { get; set; }

        public List<UserLike> LikedUsers { get; set; }
    }
}
