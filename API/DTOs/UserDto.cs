namespace API.DTOs
{
    // Represents a "logged in" user.
    public class UserDto
    {
        public string Username { get; set; }

        public string Token { get; set; }
    }
}
