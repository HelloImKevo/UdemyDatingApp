using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        [HttpGet("users-with-roles")]
        [Authorize(Policy = "RequireAdminRole")]
        public ActionResult GetUsersWithRoles()
        {
            return Ok("Only admins can see this");
        }

        [HttpGet("photos-to-moderate")]
        [Authorize(Policy = "ModeratePhotoRole")]
        public ActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this");
        }
    }
}
