using API.Extensions;

namespace API.Entities
{
    /*
    [2023-03-21] Run:
      dotnet ef migrations add InitialCreate -o Data/Migrations
      dotnet ef database update

    [2023-03-29] Run:
      dotnet ef migrations add UserPasswordAdded
      dotnet ef database update

    [2023-03-31] We experimented with:
      using System.ComponentModel.DataAnnotations.[Required]
      dotnet ef migrations add UsernameRequired
      dotnet ef migrations remove

    [2023-04-27] Run:
      dotnet ef migrations add ExtendedUserEntity
    This resulted in a [Photos] table with a nullable FK...
    See: https://learn.microsoft.com/en-us/ef/core/modeling/relationships

    So we removed that migration:
      dotnet ef migrations remove

    Then run the first command again:
      dotnet ef migrations add ExtendedUserEntity
      dotnet ef database update

    [2023-04-28] Run:
      dotnet ef database drop
     */
    public class AppUser
    {
        /// <summary>
        /// Primary Key for the User.
        /// </summary>
        public int Id { get; set; }

        // "UserName" is used (instead of username) to prevent refactoring headaches later on.
        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateOnly DateOfBirth { get; set; }

        /// <summary>
        /// Non-Unique display name for the User. Allows more that one User to have
        /// a name like "John".
        /// </summary>
        public string KnownAs { get; set; }

        /// <summary>
        /// When the User was created in our database.
        /// </summary>
        public DateTime Created { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// When was the User last active?
        /// </summary>
        public DateTime LastActive { get; set; } = DateTime.UtcNow;

        public string Gender { get; set; }

        /// <summary>
        /// Introduction tagline for the User; a brief summary about themselves.
        /// </summary>
        public string Introduction { get; set; }

        /// <summary>
        /// Qualities this User is looking for in potential matches.
        /// </summary>
        public string LookingFor { get; set; }

        /// <summary>
        /// A list of the User's interests.
        /// </summary>
        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        /// <summary>
        /// Collection of the User's uploaded Photos.
        /// </summary>
        public List<Photo> Photos { get; set; } = new();

        /// <summary>
        /// Returns how many years old this User is.
        /// </summary>
        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}
