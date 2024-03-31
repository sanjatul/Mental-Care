using System.ComponentModel.DataAnnotations;

namespace Mental_Care_API.Models.Dtos
{
    public class BlogUpdateDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string? Description { get; set; }
        public IFormFile? Image { get; set; }
    }
}
