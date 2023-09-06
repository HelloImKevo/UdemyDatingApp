namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }

        //
        // Remarks:
        //     Message sender properties.
        public int SenderId { get; set; }

        public string SenderUsername { get; set; }

        public AppUser Sender { get; set; }

        //
        // Remarks:
        //     Message recipient properties.
        public int RecipientId { get; set; }

        public string RecipientUsername { get; set; }

        public AppUser Recipient { get; set; }

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
        public DateTime MessageSent { get; set; } = DateTime.UtcNow;

        //
        // Summary:
        //     If the Sender deleted the message, the message can still
        //     remain in the Recipient's mailbox.
        public bool SenderDeleted { get; set; }

        public bool RecipientDeleted { get; set; }
    }
}
