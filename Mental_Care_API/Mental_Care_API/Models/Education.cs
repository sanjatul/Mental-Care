using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models
{
    public class Education
    {
        public int EducationId { get; set; }
        public string Description { get; set; }
        public DateTime StatingTime { get; set; }
        public DateTime? EndingTime { get; set; }

        // Foreign key to DoctorDetails
        public int DoctorDetailsId { get; set; }
        [ValidateNever]
        [ForeignKey("DoctorDetailsId")]
        public DoctorDetails DoctorDetails { get; set; }
    }
}
