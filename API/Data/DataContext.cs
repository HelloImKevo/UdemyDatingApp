using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    /// <summary>
    /// The database can be deleted with:
    /// <code>
    /// dotnet ef database drop
    /// </code>
    /// And a new database instance can be created with:
    /// <code>
    /// dotnet ef database update
    /// </code>
    /// </summary>
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
    }
}