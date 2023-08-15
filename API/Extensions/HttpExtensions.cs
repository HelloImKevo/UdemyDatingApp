using System.Text.Json;
using API.Helpers;
using Microsoft.Net.Http.Headers;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
        {
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(header, jsonOptions));
            // TODO: This needs to be validated as "Access-Control-Expose-Headers"
            response.Headers.Add(HeaderNames.AccessControlExposeHeaders, "Pagination");
        }
    }
}