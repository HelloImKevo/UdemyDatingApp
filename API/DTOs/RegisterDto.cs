using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    // Used to register a new user to the site.
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}
