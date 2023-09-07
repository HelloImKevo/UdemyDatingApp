namespace API.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }

        //
        // Remarks:
        //     Message sender properties.
        public int SenderId { get; set; }

        public string SenderUsername { get; set; }

        //
        // Remarks:
        //     URL for the Sender's Main Photo.
        public string SenderPhotoUrl { get; set; }

        //
        // Remarks:
        //     Message recipient properties.
        public int RecipientId { get; set; }

        public string RecipientUsername { get; set; }

        //
        // Remarks:
        //     URL for the Recipient's Main Photo.
        public string RecipientPhotoUrl { get; set; }

        //
        // Remarks:
        //     Message text content.
        public string Content { get; set; }

        //
        // Summary:
        //     When was the message read by the recipient?
        public DateTime? DateRead { get; set; }

        //
        // Summary:
        //     When was the message sent?
        public DateTime MessageSent { get; set; }
    }
}
