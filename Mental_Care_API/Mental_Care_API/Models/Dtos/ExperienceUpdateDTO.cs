using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models.Dtos
{
    public class ExperienceUpdateDTO
    {
        [Required]
        public int ExperienceId { get; set; }
        [Required]
        public string Designation { get; set; }
        [Required]
        public string UserId { get; set; }
        public string Speciality { get; set; }
        public bool? IsDisplay { get; set; }
        public string WorkPlace { get; set; }
        public DateTime StatingTime { get; set; }
        public DateTime? EndingTime { get; set; }
       
    }
}
