namespace API.Entities
{
    public class AppUser
    {
        //
        // Summary:
        //     Primary Key for the User.
        public int Id { get; set; }

        // "UserName" is used (instead of username) to prevent refactoring headaches later on.
        public string UserName { get; set; }
    }
}