using System.ComponentModel.DataAnnotations;

namespace Mental_Care_API.Models.Dtos
{
    public record class PsychologistUpdateDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public int Fees { get; set; }
        [Required]
        public int Experience { get; set; }
        public IFormFile? ProfilePicture { get; set; }
    }
}
