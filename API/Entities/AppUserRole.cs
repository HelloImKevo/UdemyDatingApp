using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    //
    // Summary:
    //     Represents the JOIN table between our app users and roles.
    public class AppUserRole : IdentityUserRole<int>
    {
        public AppUser User { get; set; }

        public AppRole Role { get; set; }
    }
}
