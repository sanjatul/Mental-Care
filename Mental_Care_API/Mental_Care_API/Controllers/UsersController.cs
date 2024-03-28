using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mental_Care_API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        private IImageService _imageService;
        private readonly string _baseUrl;
        public UsersController(ApplicationDbContext db, IImageService imageService, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _imageService = imageService;
            _response = new ApiResponse();
            var httpContext = httpContextAccessor.HttpContext;
            _baseUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host}";
        }


    }
}
