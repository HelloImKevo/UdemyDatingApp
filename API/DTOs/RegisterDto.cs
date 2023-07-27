using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    // Used to register a new user to the site.
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        // Optional (nullable) is required to make the form validation work!
        // Otherwise, the DateOnly will default to the current time.
        [Required]
        public DateOnly? DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}
