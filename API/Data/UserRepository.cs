using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    /// <summary>
    /// Read more on Eager Loading of Related Data:
    /// https://learn.microsoft.com/en-us/ef/core/querying/related-data/eager
    ///
    /// Note that when using 'Projection' it implicitly performs Eager Loading
    /// of our collection data like AppUser.Photos.
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            // For Reference Purposes:
            // return await _context.Users
            //     .Where(x => x.UserName == username)
            //     // Projects each element of a sequence into a new form by
            //     // incorporating the element's index.
            //     .Select(user => new MemberDto
            //     {
            //         Id = user.Id,
            //         UserName = user.UserName,
            //         KnownAs = user.KnownAs
            //     }).SingleOrDefaultAsync();
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                // Small optimization - we don't need Entity Framework to keep track changes.
                .AsNoTracking();

            return await PagedList<MemberDto>.CreateAsync(
                query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                // Eager load the entity.
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                // Eager load the entity.
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
