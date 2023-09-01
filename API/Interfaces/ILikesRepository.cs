using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        //
        // Summary:
        //     Return the target "Liked User" for the source user.
        //
        // Remarks:
        //     Returns NULL if either the [sourceUserId] or the
        //     [targetUserId] does not exist in the data source.
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);

        //
        // Summary:
        //     Retrieve an [AppUser] that is populated (hydrated) with
        //     their associated "Likes".
        Task<AppUser> GetUserWithLikes(int userId);

        //
        // Summary:
        //     [predicate] - Do you want to get the user they have "Liked", 
        //     or the user they are "Liked By".
        Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId);
    }
}
