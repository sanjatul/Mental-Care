using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models
{
    public class AppointmentHistory
    {
     
        [Key]
        public int AppointmentHistoryId { get; set; }

        [Required]
        public int AppointmentId { get; set; }
        [ForeignKey("AppointmentId")]
        [ValidateNever]
        public Appointment Appointment { get; set; }

        [Required]
        public string PatientId { get; set; }
        [ForeignKey("PatientId")]
        [ValidateNever]
        public ApplicationUser Patient { get; set; }



    }
}
