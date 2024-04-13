using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Mental_Care_API.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        public AppointmentsController(ApplicationDbContext db)
        {
            _db = db;
            _response = new ApiResponse();
        }

        [HttpGet("psychologist-schedules/{PsychologistId}")]
        public async Task<IActionResult> GetPsychologistSchedules(string PsychologistId)
        {
            var psychologistSchedules = await _db.Appointments
                .Include(a=>a.Patient)
                .Include(a=>a.Psychologist)
                .Where(x => x.PsychologistId== PsychologistId)
                .ToListAsync();
            _response.Result = psychologistSchedules;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpPost("create-schedules/{PsychologistId}")]
        public async Task<IActionResult> CreateSchedules(string PsychologistId, [FromBody] AppointmentCreateDTO model)
        {
            try
            {
                if (PsychologistId != model.PsychologistId)
                {
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Id mismatched");
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }

                var psychologist = await _db.PsychologistDetails.FirstOrDefaultAsync(p => p.UserId == PsychologistId);
                if (psychologist is null)
                {
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("No Psychologist found");
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }

                Appointment appointment = new()
                {
                    PsychologistId = model.PsychologistId,
                    StartTime = model.StartTime,
                    EndTime = model.EndTime,
                    IsOnline = model.IsOnline,
                };

                await _db.Appointments.AddAsync(appointment);
                await _db.SaveChangesAsync();

                _response.Result = appointment;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                _response.StatusCode = HttpStatusCode.InternalServerError;
                return StatusCode((int)_response.StatusCode, _response);
            }
        }


        //[HttpPut("update-schedules/{PsychologistId}")]
        //public async Task<IActionResult> UpdateSchedules(string PsychologistId, [FromBody] AppointmentCreateDTO model)
        //{
        //    try
        //    {
        //        if (PsychologistId != model.PsychologistId)
        //        {
        //            _response.IsSuccess = false;
        //            _response.ErrorMessages.Add("Id mismatched");
        //            _response.StatusCode = HttpStatusCode.BadRequest;
        //            return BadRequest(_response);
        //        }

        //        var psychologist = await _db.PsychologistDetails.FirstOrDefaultAsync(p => p.UserId == PsychologistId);
        //        if (psychologist is null)
        //        {
        //            _response.IsSuccess = false;
        //            _response.ErrorMessages.Add("No Psychologist found");
        //            _response.StatusCode = HttpStatusCode.BadRequest;
        //            return BadRequest(_response);
        //        }

        //        Appointment appointment = new()
        //        {
        //            PsychologistId = model.PsychologistId,
        //            StartTime = model.StartTime,
        //            EndTime = model.EndTime,
        //            IsOnline = model.IsOnline,
        //        };

        //        await _db.Appointments.AddAsync(appointment);
        //        await _db.SaveChangesAsync();

        //        _response.Result = appointment;
        //        _response.StatusCode = HttpStatusCode.OK;
        //        return Ok(_response);
        //    }
        //    catch (Exception ex)
        //    {
        //        _response.IsSuccess = false;
        //        _response.ErrorMessages.Add(ex.Message);
        //        _response.StatusCode = HttpStatusCode.InternalServerError;
        //        return StatusCode((int)_response.StatusCode, _response);
        //    }
        //}

        [HttpDelete("delete-schedules/{scheduleId}")]
        public async Task<IActionResult> DeleteSchedules(int scheduleId)
        {
            
            var schedule = await _db.Appointments.FirstOrDefaultAsync(p => p.AppointmentId == scheduleId);
            if (schedule is null)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("No Psychologist found");
                _response.StatusCode = HttpStatusCode.BadRequest;
                return BadRequest(_response);
            }
            _db.Appointments.Remove(schedule);
            await _db.SaveChangesAsync();
            _response.StatusCode = HttpStatusCode.NoContent;
            return Ok(_response);
        }
    }
}
