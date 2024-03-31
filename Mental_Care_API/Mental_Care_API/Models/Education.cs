using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models
{
    public class Education
    {
        [Key]
        public int EducationId { get; set; }
        [Required]
        public string Degree { get; set; }
        [Required]
        public string Institute { get; set; }
        public DateTime StatingTime { get; set; }
        public DateTime? EndingTime { get; set; }
        [Required]
        public string UserId { get; set; }
        [ValidateNever]
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUsers { get; set; }
    }
}
