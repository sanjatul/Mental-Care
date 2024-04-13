using Azure;
using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Reflection.Metadata;

namespace Mental_Care_API.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private IImageService _imageService;
        private readonly string _baseUrl;
        private ApiResponse _response;
        public UserService(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor, IImageService imageService)
        {
            _db = context;
            _response = new ApiResponse();
            _hostingEnvironment = hostingEnvironment;
            var httpContext = httpContextAccessor.HttpContext;
            _baseUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host}";
            _imageService = imageService;
        }

        public async Task<bool> DeletePsycologist(string Id)
        {
            // Find psychologist details by UserId
            var psychologistDetails = await _db.PsychologistDetails.FirstOrDefaultAsync(x => x.UserId == Id);
            if (psychologistDetails == null)
            {
                // If psychologist details not found, return false indicating deletion was not successful
                return false;
            }

            // Find experiences associated with the user
            var experiences = await _db.Experiences.Where(x => x.UserId == Id).ToListAsync();
            // Remove experiences
            _db.Experiences.RemoveRange(experiences);

            // Find educations associated with the user
            var educations = await _db.Educations.Where(x => x.UserId == Id).ToListAsync();
            // Remove educations
            _db.Educations.RemoveRange(educations);

            // Remove psychologist details
            _db.PsychologistDetails.Remove(psychologistDetails);

            // Find and remove the ApplicationUser
            var user = await _db.ApplicationUsers.FirstOrDefaultAsync(x => x.Id == Id);
            if (user != null)
            {
                _db.ApplicationUsers.Remove(user);
            }

            // Save changes to the database
            await _db.SaveChangesAsync();

            // Return true indicating deletion was successful
            return true;
        }

        public async Task<bool> DeleteUser(string Id)
        {
            var generalUser= await _db.ApplicationUsers.FirstOrDefaultAsync(x => x.Id == Id);
            if (generalUser == null)
                return false;
            await _imageService.DeleteFile(generalUser.ProfilePicture, "images");
            _db.ApplicationUsers.Remove(generalUser);
            await _db.SaveChangesAsync();
            return true;

        }

        public Task<ApiResponse> GetPsycologist(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse> GetPsycologists()
        {
            throw new NotImplementedException();
        }

        public async Task<GeneralUserDetailsDTO> GetUser(string Id)
        {
            var generalUser = await _db.ApplicationUsers.FirstOrDefaultAsync(u=>u.Id==Id && u.EmailConfirmed==true);
            if (generalUser == null)
            {
                return null;
            }
            GeneralUserDetailsDTO generalUserDetails = new() {
                Id = generalUser.Id,
                Name = generalUser.Name,
                PhoneNumber = generalUser.PhoneNumber,
                Email = generalUser.Email,
                Age = generalUser.Age,
                Gender = generalUser.Gender,
                ProfilePicture = $"{_baseUrl}/images/{generalUser?.ProfilePicture}"
            };
            return generalUserDetails;
        }

        public async Task<List<GeneralUserDetailsDTO>> GetUsers()
        {
            var generalUsers = await _db.ApplicationUsers
    .Where(u => u.EmailConfirmed &&
                _db.UserRoles.Any(ur => ur.UserId == u.Id &&
                                         _db.Roles.Any(r => r.Id == ur.RoleId && r.Name == "User")))
    .ToListAsync();

            var generalUserDetails = generalUsers.Select(user => new GeneralUserDetailsDTO
            {
                Id = user.Id,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber,
                Age = user.Age,
                Gender = user.Gender,
                Email = user.Email,
                ProfilePicture = $"{_baseUrl}/images/{user?.ProfilePicture}"
            }).ToList();
            return generalUserDetails;

        }

        public Task<ApiResponse> UpdatePsycologist(string Id)
        {
            throw new NotImplementedException();
        }

        //public Task<bool> DeletePsycologist(string Id)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
