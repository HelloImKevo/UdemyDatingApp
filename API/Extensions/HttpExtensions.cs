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

            // Pagination header will be serialized like:
            // {"currentPage":1,"itemsPerPage":10,"totalItems":14,"totalPages":2}
            response.Headers.Add("Pagination", JsonSerializer.Serialize(header, jsonOptions));

            // HeaderNames works as expected. Further discussions here:
            // https://stackoverflow.com/questions/11037004/are-there-any-constants-for-the-default-http-headers
            response.Headers.Add(HeaderNames.AccessControlExposeHeaders, "Pagination");
        }
    }
}