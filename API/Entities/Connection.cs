namespace API.Entities
{
    public class Connection
    {
        // Need an empty constructor for Entity Framework.
        public Connection()
        {
        }

        public Connection(string connectionId, string username)
        {
            ConnectionId = connectionId;
            Username = username;
        }

        public string ConnectionId { get; set; }

        public string Username { get; set; }
    }
}
