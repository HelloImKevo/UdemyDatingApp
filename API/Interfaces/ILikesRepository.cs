using API.DTOs;
using API.Entities;
using API.Helpers;

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
        //     Filter params that include a predicate (Do you want to get
        //     the list of your Likes, or a list of users that Like You?)
        //     and the requester's User ID.
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
    }
}
