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

        [HttpGet("available-schedules/{PsychologistId}")]
        public async Task<IActionResult> AvailableSchedules(string PsychologistId)
        {
            var psychologistSchedules = await _db.Appointments
                    .Where(x => x.PsychologistId == PsychologistId &&
                        !x.IsBooked &&
                         x.EndTime > DateTime.UtcNow)
                        .ToListAsync();

            if (!psychologistSchedules.Any())
            {
                _response.IsSuccess = false;
                _response.Result = psychologistSchedules;
                return Ok(_response);
            }
            var appointmentDetailsDTOs = psychologistSchedules.Select(appointment => new AppointmentDetailsDTO { 
                    PsychologistId=appointment.PsychologistId,
                     AppointmentId=appointment.AppointmentId,
                     StartTime=appointment.StartTime,
                     EndTime=appointment.EndTime,
                     IsOnline=appointment.IsOnline,
            }).ToList();
            _response.Result = appointmentDetailsDTOs;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpGet("occupied-schedules/{PsychologistId}")]
        public async Task<IActionResult> BookedSchedules(string PsychologistId)
        {
            try {
                var occupiedSchedules = await _db.AppointmentsHistory
            .Include(x => x.Appointment)
                  .ThenInclude(a => a.Psychologist)
                  .Include(x => x.Patient) // Include the Patient details
                  .Where(x => x.Appointment.PsychologistId == PsychologistId && x.Appointment.IsBooked && x.Appointment.EndTime > DateTime.Now)
             .Select(x => new BookedScheduleDetailsDTO
             {
                 AppointmentHistoryId = x.AppointmentHistoryId,
                 AppointmentId = x.AppointmentId,
                 PatientId = x.PatientId,
                 PatientName = x.Patient.Name,
                 StartTime = x.Appointment.StartTime,
                 EndTime = x.Appointment.EndTime,
                 IsOnline = x.Appointment.IsOnline
             })
              .ToListAsync();
                _response.Result = occupiedSchedules;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Internal Error");
                return Ok(_response);
            }
         
        }
        [HttpGet("previous-psychologist-occupied-schedules/{PsychologistId}")]
        public async Task<IActionResult> PreviousPsychologistSchedules(string PsychologistId)
        {
            try
            {
                var occupiedSchedules = await _db.AppointmentsHistory
            .Include(x => x.Appointment)
                  .ThenInclude(a => a.Psychologist)
                  .Include(x => x.Patient) // Include the Patient details
                  .Where(x => x.Appointment.PsychologistId == PsychologistId && x.Appointment.IsBooked && x.Appointment.EndTime < DateTime.Now)
             .Select(x => new HistoryBookedAppointmentDTO
             {
                 AppointmentHistoryId = x.AppointmentHistoryId,
                 AppointmentId = x.AppointmentId,
                 PatientId = x.PatientId,
                 Name = x.Patient.Name,
                 StartTime = x.Appointment.StartTime,
                 EndTime = x.Appointment.EndTime,
                 IsOnline = x.Appointment.IsOnline
             })
              .ToListAsync();
                _response.Result = occupiedSchedules;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Internal Error");
                return Ok(_response);
            }

        }

        [HttpPost("create-schedules")]
        public async Task<IActionResult> CreateSchedules([FromBody] AppointmentCreateDTO model)
        {
            try
            {
                
                var psychologist = await _db.PsychologistDetails.FirstOrDefaultAsync(p => p.UserId == model.PsychologistId);
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


                var psychologistSchedules = await _db.Appointments
                .Where(x => x.PsychologistId == model.PsychologistId)
                .ToListAsync();


                if (!psychologistSchedules.Any())
                {
                    _response.IsSuccess = false;
                    return Ok(_response);
                }
                var appointmentDetailsDTOs = psychologistSchedules.Select(appointment => new AppointmentDetailsDTO
                {
                    PsychologistId = appointment.PsychologistId,
                    AppointmentId = appointment.AppointmentId,
                    StartTime = appointment.StartTime,
                    EndTime = appointment.EndTime,
                    IsOnline = appointment.IsOnline
                }).ToList();

                _response.Result = appointmentDetailsDTOs;
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

        [HttpDelete("delete-available-schedules/{scheduleId}")]
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
