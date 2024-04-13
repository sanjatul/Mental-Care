using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
using Mental_Care_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Net;

namespace Mental_Care_API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        private IImageService _imageService;
        private IUserService _userService;
        private readonly string _baseUrl;
        public UsersController(ApplicationDbContext db, IImageService imageService, IHttpContextAccessor httpContextAccessor, IUserService userService)
        {
            _db = db;
            _imageService = imageService;
            _response = new ApiResponse();
            var httpContext = httpContextAccessor.HttpContext;
            _baseUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host}";
            _userService = userService;
        }

        [HttpGet("get-psychologists")]
        public async Task<IActionResult> GetPsycologists()
        {
            var psychologistsWithDetails = _db.PsychologistDetails
         .Select(p => new PsychologistsDTO
         {
             UserId = p.UserId,
             Name = p.ApplicationUser.Name,
             Email = p.ApplicationUser.Email,
             IsApproved= p.IsApproved,
             Gender=p.ApplicationUser.Gender,
             ProfilePicture = $"{_baseUrl}/images/{p.ApplicationUser.ProfilePicture}",
             Certificate= $"{_baseUrl}/certificates/{p.Certificate}",
             Location = p.Location,
             Designation = _db.Experiences
                 .Where(e => e.UserId == p.UserId && e.IsDisplay == true)
                 .Select(e => e.Designation)
                 .FirstOrDefault(),
             Speciality = _db.Experiences
                 .Where(e => e.UserId == p.UserId && e.IsDisplay == true)
                 .Select(e => e.Speciality)
                 .FirstOrDefault(),
             WorkPlace = _db.Experiences
                 .Where(e => e.UserId == p.UserId && e.IsDisplay == true)
                 .Select(e => e.WorkPlace)
                 .FirstOrDefault(),
             YearsOfExperience = p.YearsOfExperience
         }).ToList();
            _response.Result = psychologistsWithDetails;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpGet("get-psychologist/{Id}")]
        public async Task<IActionResult> GetPsycologist(string Id)
        {
          if(Id is null) {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid Id");
                return BadRequest(_response);
            }
          var psychologistsWithDetails = _db.PsychologistDetails
         .Where(p => p.IsApproved == true && p.UserId==Id)
         .Select(p => new PsychologistDetailsDTO
         {
             DoctorId = p.DoctorId,
             UserId = p.UserId,
             Name = p.ApplicationUser.Name,
             ProfilePicture = $"{_baseUrl}/images/{p.ApplicationUser.ProfilePicture}",
             Age = p.ApplicationUser.Age,
             Gender = p.ApplicationUser.Gender,
             Email = p.ApplicationUser.Email, 
             IsApproved = p.IsApproved,
             Location = p.Location,
             YearsOfExperience = p.YearsOfExperience,
             Certificate = $"{_baseUrl}/certificates/{p.Certificate}",
             Experiences = _db.Experiences
                 .Where(e => e.UserId == p.UserId)
                 .Select(e => new ExperienceResopnseDTO
                 {
                     ExperienceId = e.ExperienceId,
                     IsDisplay = e.IsDisplay,
                     Designation = e.Designation,
                     Speciality = e.Speciality,
                     WorkPlace = e.WorkPlace,
                     StatingTime = e.StatingTime,
                     EndingTime = e.EndingTime
                 }).ToList(),
             Educations = _db.Educations
                 .Where(e => e.UserId == p.UserId)
                 .Select(e => new EducationResopnseDTO
                 {
                     EducationId = e.EducationId,
                     Degree = e.Degree,
                     Institute = e.Institute,
                     StatingTime = e.StatingTime,
                     EndingTime = e.EndingTime
                 }).ToList()
         });
            if (psychologistsWithDetails is null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("No user found");
                return BadRequest(_response);
            }
            _response.Result= psychologistsWithDetails;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpDelete("delete-psychologist/{id}")]
        public async Task<ActionResult<ApiResponse>> DeletePsychologist(string? id)
        {
            if (id == null || id == "")
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid Id");
                return BadRequest(_response);
            }
            var isDeleted = await _userService.DeletePsycologist(id);
            if (isDeleted == false)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Something went wrong");
                return BadRequest(_response);
            }
            _response.StatusCode = HttpStatusCode.NoContent;
            return Ok(_response);
        }
        [HttpPut("approve-psychologist/{id}")]
        public async Task<ActionResult<ApiResponse>> ApprovePsychologist(string? id)
        {
            if (id == null || id == "")
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid Id");
                return BadRequest(_response);
            }
            var psychologist = await _db.PsychologistDetails.FirstOrDefaultAsync(x => x.UserId == id);
            if (psychologist == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("No user found");
                return BadRequest(_response);
            }
            psychologist.IsApproved = true;
             _db.PsychologistDetails.Update(psychologist);
            await _db.SaveChangesAsync();
            _response.StatusCode = HttpStatusCode.NoContent;
            return Ok(_response);
        }

        [HttpGet("get-general-users")]
        public async Task<ActionResult<ApiResponse>> GetGeneralUsers()
        {
            var generalUsers=await _userService.GetUsers();
            _response.Result = generalUsers;
            _response.StatusCode = HttpStatusCode.OK;

            return Ok(_response);
        }


        [HttpGet("get-general-user/{id}")]
        public async Task<ActionResult<ApiResponse>> GetGeneralUser(string? id)
        {
            if(id==null || id=="")
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid Id");
                return BadRequest(_response);
            }
            var generalUser=await _userService.GetUser(id);
            if (generalUser == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("No Entry found");
                return BadRequest(_response);
            }
            _response.StatusCode = HttpStatusCode.NoContent;
            _response.Result = generalUser;
            return Ok(_response);
        }
        [HttpDelete("delete-general-user/{id}")]
        public async Task<ActionResult<ApiResponse>> DeleteGeneralUser(string? id)
        {
            if (id == null || id == "")
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid Id");
                return BadRequest(_response);
            }
            var generalUser = await _userService.DeleteUser(id);
            if (generalUser == false)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Something went wrong");
                return BadRequest(_response);
            }
            _response.StatusCode = HttpStatusCode.NoContent;
            return Ok(_response);
        }
        [HttpPut("update-general-user/{id}")]
        public async Task<ActionResult<ApiResponse>> UpdateGeneralUser(string? id, [FromForm] GeneralUserUpdateDTO model)
        {
            if (id == null || id == "" || id!=model.Id)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid Id");
                return BadRequest(_response);
            }
            var user=await _db.ApplicationUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("User not found");
                return BadRequest(_response);
            }
            string normalizedGender = model.Gender.ToLower();
            string gender;
            switch (normalizedGender)
            {
                case "male":
                    gender = "Male";
                    break;
                case "female":
                    gender = "Female";
                    break;
                default:
                    gender = "Others";
                    break;
            }
            user.PhoneNumber = model.PhoneNumber;
            user.Name = model.Name;
            user.Age = model.Age;
            user.Gender = gender;

            if (model.ProfilePicture != null && model.ProfilePicture.Length > 0)
            {
                if (user.ProfilePicture != null)
                {
                    await _imageService.DeleteFile(user.ProfilePicture, "images");

                }
                string filename = $"{Guid.NewGuid()}{Path.GetExtension(model.ProfilePicture.FileName)}";
                user.ProfilePicture = await _imageService.UploadFile(filename, "images", model.ProfilePicture);
            }

            _db.ApplicationUsers.Update(user);
            await _db.SaveChangesAsync();

            GeneralUserDetailsDTO generalUserDetails = new() { 
            Id = user.Id,
            Name = user.Name,
            Email=user.Email, 
            PhoneNumber = user.PhoneNumber,
            Gender= user.Gender,
            Age= user.Age,
            ProfilePicture= $"{_baseUrl}/images/{user.ProfilePicture}"
            };
            _response.StatusCode = HttpStatusCode.NoContent;
            _response.Result = generalUserDetails;
            return Ok(_response);
        }

    }
}
