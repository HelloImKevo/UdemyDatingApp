using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        //
        // Summary:
        //     Create a new [Message] between a Sender and Recipient.
        void AddMessage(Message message);

        //
        // Summary:
        //     Delete a [Message] altogether (is this different from the
        //     SenderDeleted and RecipientDeleted soft deletes?)
        void DeleteMessage(Message message);

        //
        // Summary:
        //     Fetch a specific [Message] by its Primary Key.
        Task<Message> GetMessage(int id);

        //
        // Summary:
        //     Fetch the list of [Messages] for the currently authenticated user
        //     filtered according to the passed [MessageParams]. You can specify
        //     "Inbox", "Outbox" or "Unread" in the params (if nothing is specified,
        //     it will default to "Unread" messages).
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);

        Task<IEnumerable<MessageDto>> GetMessageThread(int currentUserId, int recipientId);

        Task<bool> SaveAllAsync();
    }
}
