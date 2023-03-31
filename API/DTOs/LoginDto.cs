using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    /// <summary>
    /// An attempted login request from the client.
    /// If login is successful, a <see cref="UserDto"/> can be returned.
    /// </summary>
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
