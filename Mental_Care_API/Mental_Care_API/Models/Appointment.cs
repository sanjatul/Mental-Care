using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models
{
    public class Appointment
    {
        [Key]
        public int AppointmentId { get; set; }
        [Required]
        public string PsychologistId { get; set; }
        public string? PatientId { get; set; }

        [ForeignKey("PsychologistId")]
        [ValidateNever]
        public ApplicationUser Psychologist { get; set; }

        [ForeignKey("PatientId")]
        [ValidateNever]
        public ApplicationUser? Patient { get; set; }
        [DateNotPast(ErrorMessage = "Start time cannot be before the current date time.")]
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
        public bool IsBooked { get; set; } = false;
        public bool IsOnline { get; set; }
    }

    public class DateNotPastAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            DateTime dateTime = (DateTime)value;
            return dateTime >= DateTime.UtcNow;
        }
    }
}
