using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models
{
    public class Experience
    {
        public int ExperienceId { get; set; }
        public string Description { get; set; }
        public DateTime StatingTime { get; set; }
        public DateTime? EndingTime { get; set; }

        // Foreign key to DoctorDetails
        public int DoctorDetailsId { get; set; }
        [ForeignKey("DoctorDetailsId")]
        [ValidateNever]
        public DoctorDetails DoctorDetails { get; set; }
    }
}
