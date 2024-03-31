using System.ComponentModel.DataAnnotations;

namespace Mental_Care_API.Models.Dtos
{
    public class GeneralUserUpdateDTO
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public int Age { get; set; }
        public IFormFile? ProfilePicture { get; set; }
    }
}
