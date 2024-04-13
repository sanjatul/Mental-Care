using System.ComponentModel.DataAnnotations;
namespace Mental_Care_API.Models.Dtos
{
    public class AppointmentCreateDTO
    {
        [Required]
        public string PsychologistId { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
        [Required]
        public bool IsOnline { get; set; }
    }
}
