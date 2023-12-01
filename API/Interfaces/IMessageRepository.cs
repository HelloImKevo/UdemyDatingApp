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

        //
        // Summary:
        //     Builds a fully-populated collection of the messages exchanged between
        //     two users, including the Photo URL (for both the Sender and the Recipient)
        //      and Date/Time information.
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName);

        Task<bool> SaveAllAsync();

        // Add a SignalR message group to our hub.
        void AddGroup(Group group);

        // Get a SignalR hub Connection instance.
        Task<Connection> GetConnection(string connectionId);

        // Remove a SignalR message group connection.
        void RemoveConnection(Connection connection);

        Task<Group> GetMessageGroup(string groupName);
    }
}
