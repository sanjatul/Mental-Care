using System.ComponentModel.DataAnnotations;

namespace Mental_Care_API.Models.Dtos
{
    public class AppointmentSlotRequestDTO
    {
        [Required]
        public string PsychologistId { get; set; }
        [Required]
        public string RequestType {  get; set; }
    }
}
