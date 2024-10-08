﻿using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models
{
    public class Experience
    {
        [Key]
        public int ExperienceId { get; set; }
        [Required]
        public string Designation { get; set; }
        public string Speciality { get; set; }
        public string WorkPlace { get; set; }
        public DateTime StatingTime { get; set; }
        public DateTime? EndingTime { get; set; }
        [Required]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        [ValidateNever]
        public ApplicationUser ApplicationUsers { get; set; }
        public bool? IsDisplay { get; set; }
    }
}
