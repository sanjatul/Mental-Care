using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models
{
    public class DoctorDetails
    {
        [Key]
        public int DoctorId { get; set; }
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        [ValidateNever]
        public ApplicationUser ApplicationUser { get; set; }

        public bool? IsApproved { get; set; }
        public string? Location { get; set; }
        public int? YearsOfExperience { get; set; }
        public string? Certificate { get; set; }    
        // Collection of experiences
        [NotMapped]
        public ICollection<Experience>? Experiences { get; set; }
        [NotMapped]
        public ICollection<Education>? Educations { get; set; }

    }
}
