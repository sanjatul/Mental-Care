using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Mental_Care_API.Controllers
{
    [Route("api/professional-details")]
    [ApiController]
    public class ProfessionalDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        public ProfessionalDetailsController(ApplicationDbContext db)
        {
            _db = db;
            _response = new ApiResponse();
        }
        [HttpGet("GetExperiences/{userId}")]
        public async Task<IActionResult> GetExperiences(string userId)
        {
            var experience=await _db.Experiences
                .Where(x => x.UserId == userId)
                .ToListAsync();
            var experiencesDto= experience.Select(experience => new ExperienceResopnseDTO
            {
                ExperienceId=experience.ExperienceId,
                Designation=experience.Designation,
                Speciality=experience.Speciality,
                WorkPlace=experience.WorkPlace,
                StatingTime=experience.StatingTime,
                EndingTime=experience.EndingTime,
                IsDisplay=experience.IsDisplay,
            }).ToList();

            _response.Result = experiencesDto;
            _response.StatusCode = HttpStatusCode.OK;

            return Ok(_response);
        }
        [HttpPost("CreateExperience/{userId}")]
        public async Task<IActionResult> CreateExperience(string userId, [FromBody]ExperienceCreateDTO model)
        {
            if(ModelState.IsValid)
            {
                if (userId != model.UserId)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("Invalid User Id");
                    return BadRequest(_response);
                }
                var user = _db.ApplicationUsers.FirstOrDefault(u => u.Id == userId);
                if (user == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("No user found");
                    return BadRequest(_response);
                }

                Experience experience = new() { 
                UserId = userId,
                Speciality = model.Speciality,
                Designation=model.Designation,
                WorkPlace=model.WorkPlace,
                StatingTime=model.StatingTime,
                EndingTime=model.EndingTime,
                IsDisplay=model.IsDisplay,
                };
               await _db.Experiences.AddAsync(experience);
               await _db.SaveChangesAsync();
                return RedirectToAction(nameof(GetExperiences), new { userId });
            }
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.ErrorMessages.Add("Model not valid");
            return BadRequest(_response);
        }


        [HttpPut("UpdateExperience/{ExperienceId}")]
        public async Task<IActionResult> UpdateExperience(int ExperienceId, [FromBody] ExperienceUpdateDTO model)
        {
            if (ModelState.IsValid)
            {
                if (ExperienceId != model.ExperienceId)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("Invalid ExperienceId");
                    return BadRequest(_response);
                }
                var experience = _db.Experiences.FirstOrDefault(u => u.ExperienceId == ExperienceId);
                if (experience == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("No experience found");
                    return BadRequest(_response);
                }

                experience.Speciality = model.Speciality;
                experience.Designation = model.Designation;
                experience.WorkPlace = model.WorkPlace;
                experience.StatingTime = model.StatingTime;
                experience.EndingTime = model.EndingTime;
                experience.IsDisplay = model.IsDisplay;
                _db.Experiences.Update(experience);

                var otherExperiences = await _db.Experiences.Where(e => e.UserId == model.UserId && e.ExperienceId != model.ExperienceId).ToListAsync();
                if (otherExperiences != null && otherExperiences.Count > 0)
                {
                    foreach (var otherExperience in otherExperiences)
                    {
                        otherExperience.IsDisplay = false;
                        _db.Experiences.Update(otherExperience);
                    }
                }
                await _db.SaveChangesAsync();
                return await GetExperiences(experience.UserId);
            }
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.ErrorMessages.Add("Model not valid");
            return BadRequest(_response);
        }



        [HttpDelete("DeleteExperience/{ExperienceId}")]
        public async Task<IActionResult> DeleteExperience(int ExperienceId)
        {
           
                var experience = _db.Experiences.FirstOrDefault(u => u.ExperienceId == ExperienceId);
                if (experience == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("No experience found");
                    return BadRequest(_response);
                }

                _db.Experiences.Remove(experience);
                await _db.SaveChangesAsync();
            return await GetExperiences(experience.UserId);
        }

        //Education Section

        [HttpGet("GeteEducations/{userId}")]
        public async Task<IActionResult> GeteEducations(string userId)
        {
            var educations = await _db.Educations
                .Where(x => x.UserId == userId)
                .ToListAsync();
            var educationssDto = educations.Select(education => new EducationResopnseDTO
            {
                EducationId = education.EducationId,
                Degree = education.Degree,
                Institute = education.Institute,
                StatingTime = education.StatingTime,
                EndingTime = education.EndingTime,
            }).ToList();

            _response.Result = educationssDto;
            _response.StatusCode = HttpStatusCode.OK;

            return Ok(_response);
        }
        [HttpPost("CreateEducation/{userId}")]
        public async Task<IActionResult> CreateEducation(string userId, [FromBody] EducationCreateDTO model)
        {
            if (ModelState.IsValid)
            {
                if (userId != model.UserId)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("Invalid User Id");
                    return BadRequest(_response);
                }
                var user = _db.ApplicationUsers.FirstOrDefault(u => u.Id == userId);
                if (user == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("No user found");
                    return BadRequest(_response);
                }

                Education education = new()
                {
                    UserId = userId,
                    Degree = model.Degree,
                    Institute = model.Institute,
                    StatingTime = model.StatingTime,
                    EndingTime = model.EndingTime,
                };
                await _db.Educations.AddAsync(education);
                await _db.SaveChangesAsync();
                return RedirectToAction(nameof(GeteEducations), new { userId });
            }
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.ErrorMessages.Add("Model not valid");
            return BadRequest(_response);
        }


        [HttpPut("UpdateEducation/{EducationId}")]
        public async Task<IActionResult> UpdateEducation(int EducationId, [FromBody] EducationUpdateDTO model)
        {
            if (ModelState.IsValid)
            {
                if (EducationId != model.EducationId)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("Invalid EducationId");
                    return BadRequest(_response);
                }
                var education = _db.Educations.FirstOrDefault(u => u.EducationId == EducationId);
                if (education == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("No education found");
                    return BadRequest(_response);
                }

                education.Degree = model.Degree;
                education.Institute = model.Institute;
                education.StatingTime = model.StatingTime;
                education.EndingTime = model.EndingTime;
                _db.Educations.Update(education);
                await _db.SaveChangesAsync();
                return await GeteEducations(education.UserId);
            }
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.ErrorMessages.Add("Model not valid");
            return BadRequest(_response);
        }



        [HttpDelete("DeleteeEducation/{EducationId}")]
        public async Task<IActionResult> DeleteEducation(int EducationId)
        {

            var education = _db.Educations.FirstOrDefault(u => u.EducationId == EducationId);
            if (education == null)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessages.Add("No Education found");
                return BadRequest(_response);
            }

            _db.Educations.Remove(education);
            await _db.SaveChangesAsync();
            return await GeteEducations(education.UserId);
        }
    }
}
