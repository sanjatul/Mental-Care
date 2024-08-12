using System.ComponentModel.DataAnnotations;

namespace Mental_Care_API.Models.Dtos
{
    public class BookScheduleRequestDTO
    {
        [Required]
        public int AppointmentId { get; set; }
        [Required]
        public string PatientId { get; set; }
    }
}
