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

        Task<PagedList<MessageDto>> GetMessagesForUser();

        Task<IEnumerable<MessageDto>> GetMessageThread(int currentUserId, int recipientId);

        Task<bool> SaveAllAsync();
    }
}
