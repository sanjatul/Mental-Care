using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
using Mental_Care_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Reflection.Metadata;

namespace Mental_Care_API.Controllers
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        private IImageService _imageService;
        private readonly string _baseUrl;
        public BlogsController(ApplicationDbContext db, IImageService imageService, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _imageService = imageService;
            _response = new ApiResponse();
            var httpContext = httpContextAccessor.HttpContext;
            _baseUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host}";
        }

        [HttpGet("GetAllBlogs")]
        public async Task<IActionResult> GetBlogs()
        {
            var blogs = await _db.Blogs
                .Include(b => b.ApplicationUser)
                .OrderByDescending(b => b.CreatedDate)
                .ToListAsync();

            var blogResponseDTOs = blogs.Select(blog => new BlogResponseDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                UserId = blog.UserId,
                UserName = blog.ApplicationUser?.Name,
                ProfilePicture = $"{_baseUrl}/images/{blog?.ApplicationUser?.ProfilePicture}", 
                CreatedDate = blog.CreatedDate,
                Image = blog.Image != null ? $"{_baseUrl}/blogs/{blog.Image}" : null,
                Description = blog?.Description
            }).ToList();

            _response.Result = blogResponseDTOs;
            _response.StatusCode = HttpStatusCode.OK;

            return Ok(_response);
        }


        [HttpGet("{id:int}", Name = "GetBlog")]
        public async Task<IActionResult> GetBlog(int? id)
        {
            if (id == 0 || id== null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Not a valid Id");
                return BadRequest(_response);
            }
            Blog? blog = await _db.Blogs.Include(b => b.ApplicationUser).FirstOrDefaultAsync(u => u.Id == id);
            if (blog == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("No entry found");
                return NotFound(_response);
            }

            BlogResponseDTO blogResponseDTO = new()
            {
                Id = blog.Id,
                UserName=blog.ApplicationUser.Name,
                ProfilePicture=$"{_baseUrl}/images/{blog.ApplicationUser.ProfilePicture}",
                Title = blog.Title,
                UserId = blog.UserId,
                CreatedDate = blog.CreatedDate,
                Image= blog.Image != null ? $"{_baseUrl}/blogs/{blog.Image}" : null,
                Description = blog.Description
            };
            _response.Result = blogResponseDTO;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateBlog([FromForm]BlogCreateDTO  model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string? filename=null;
                    if (model.Image != null || model.Image?.Length > 0)
                    {
                        filename = $"{Guid.NewGuid()}{Path.GetExtension(model.Image.FileName)}";
                        filename = await _imageService.UploadFile(filename, "blogs", model.Image);
                    }

                    
                    Blog blog = new()
                    {
                        Title = model.Title,
                        Description = model.Description,
                        CreatedDate = DateTime.Now,
                        Image =filename ,
                        UserId=model.UserId
                    };
                    await _db.Blogs.AddAsync(blog);
                    await _db.SaveChangesAsync();


                    Blog? blogFromDb = await _db.Blogs
                         .Include(b => b.ApplicationUser)
                         .FirstOrDefaultAsync(b => b.Id == blog.Id);

                    BlogResponseDTO blogResponseDTO = new()
                    {
                        Id = blogFromDb.Id,
                        Title = blogFromDb.Title,
                        UserId = blogFromDb.UserId,
                        UserName = blogFromDb.ApplicationUser.Name,
                        ProfilePicture = $"{_baseUrl}/images/{blogFromDb.ApplicationUser.ProfilePicture}", 
                        CreatedDate = blogFromDb.CreatedDate,
                        Image= blogFromDb.Image != null ? $"{_baseUrl}/blogs/{blogFromDb.Image}" : null,
                        Description = blogFromDb.Description
                    };

                    _response.StatusCode = HttpStatusCode.Created;
                    _response.Result = blogResponseDTO;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
                else
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("Invalid request");
                    _response.IsSuccess = false;
                    return BadRequest(_response);
                    
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                return BadRequest(_response);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<ApiResponse>> UpdateBlog(int id, [FromForm] BlogUpdateDTO model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (model == null || model.Id != id ||model.Id != id)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        _response.ErrorMessages.Add("Invalid Id");
                        return BadRequest(_response);
                    }

                    Blog? blogFromDb = await _db.Blogs.Include(b=>b.ApplicationUser).FirstOrDefaultAsync(u => u.Id == id); ;
                    if (blogFromDb == null)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        _response.ErrorMessages.Add("No entry found");
                        return BadRequest(_response);
                    }
                   
                    blogFromDb.Title = model.Title;
                    blogFromDb.Description = model.Description;
                    //blogFromDb.UserId = blogFromDb.UserId;
                    //blogFromDb.CreatedDate=blogFromDb.CreatedDate;
                    //blogFromDb.Image=blogFromDb.Image;

                    if (model.Image != null && model.Image.Length > 0)
                    {
                        if(blogFromDb.Image != null)
                        {
                            await _imageService.DeleteFile(blogFromDb.Image, "blogs");
                            
                        }
                        string filename = $"{Guid.NewGuid()}{Path.GetExtension(model.Image.FileName)}";
                        blogFromDb.Image = await _imageService.UploadFile(filename, "blogs", model.Image);
                    }

                    _db.Blogs.Update(blogFromDb);
                    await _db.SaveChangesAsync();


                    BlogResponseDTO blogResponseDTO = new()
                    {
                        Id = blogFromDb.Id,
                        Title = blogFromDb.Title,
                        UserId = blogFromDb.UserId,
                        UserName = blogFromDb.ApplicationUser.Name,
                        ProfilePicture = $"{_baseUrl}/images/{blogFromDb.ApplicationUser.ProfilePicture}",
                        CreatedDate = blogFromDb.CreatedDate,
                        Image = blogFromDb.Image != null ? $"{_baseUrl}/blogs/{blogFromDb.Image}" : null,
                        Description = blogFromDb.Description
                    };
                    if (blogFromDb.Image != null)
                    {
                        blogResponseDTO.Image = $"{_baseUrl}/blogs/{blogFromDb.Image}";
                    }

                    _response.StatusCode = HttpStatusCode.NoContent;
                    _response.Result = blogResponseDTO;

                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return Ok(_response);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ApiResponse>> DeleteBlog(int? id)
        {
            try
            {

                if (id == 0 || id==null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Not a valid Id");
                    return BadRequest(_response);
                }

                Blog? blogFromDb = await _db.Blogs
                .Include(b => b.ApplicationUser)
                        .FirstOrDefaultAsync(b => b.Id ==id);
                if (blogFromDb == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("No enrty found");
                    return BadRequest(_response);
                }
                await _imageService.DeleteFile(blogFromDb.Image,"blogs");
                int millseconds = 2000;
                Thread.Sleep(millseconds);
                _db.Blogs.Remove(blogFromDb);
                await _db.SaveChangesAsync();
                _response.StatusCode = HttpStatusCode.NoContent;
                return Ok(_response);

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                return BadRequest(_response);
            }
        }
    }
}
