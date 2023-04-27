namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateOnly dob)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var age = today.Year - dob.Year;

            // If they haven't had their birthday yet this year, take off a year.
            if (dob > today.AddYears(-age)) age--;

            // Note: This may not account for leap years.
            return age;
        }
    }
}
