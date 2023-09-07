namespace API.DTOs
{
    public class CreateMessageDto
    {
        public string RecipientUsername { get; set; }

        //
        // Summary:
        //     Message text content.
        public string Content { get; set; }
    }
}
