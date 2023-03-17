namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        // "UserName" is used (instead of username) to prevent refactoring headaches later on.
        public string UserName { get; set; }
    }
}