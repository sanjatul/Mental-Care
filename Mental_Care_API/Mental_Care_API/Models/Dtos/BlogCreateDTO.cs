using System.ComponentModel.DataAnnotations;
namespace Mental_Care_API.Models.Dtos
{
    public class BlogCreateDTO
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string UserId { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; }
    }
}
