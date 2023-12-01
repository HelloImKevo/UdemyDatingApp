using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(
                    dest => dest.PhotoUrl,
                    // Map the App User's "Main" photo to the MemberDto.PhotoUrl.
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(
                    dest => dest.Age,
                    // To optimize our SQL LINQ queries, calculate the age (in years)
                    // of each MemberDto as needed.
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(
                    dest => dest.SenderPhotoUrl,
                    // Map the Sender's "Main" photo to the MessageDto.SenderPhotoUrl.
                    opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(
                    dest => dest.RecipientPhotoUrl,
                    // Map the Recipient's "Main" photo to the MessageDto.RecipientPhotoUrl.
                    opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
            // Make sure our dates are always communicated (serialized) with a Z (Zulu meridian)
            // according to ISO 8601 spec for UTC.
            CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
            CreateMap<DateTime?, DateTime?>().ConvertUsing(d => d.HasValue
                ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);
        }
    }
}
