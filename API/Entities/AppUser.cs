namespace API.Entities
{
    /*
    2023-03-21: Run:
      dotnet ef migrations add InitialCreate -o Data/Migrations
      dotnet ef database update

    2023-03-29: Run:
      dotnet ef migrations add UserPasswordAdded
      dotnet ef database update
     */
    public class AppUser
    {
        //
        // Summary:
        //     Primary Key for the User.
        public int Id { get; set; }

        // "UserName" is used (instead of username) to prevent refactoring headaches later on.
        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}