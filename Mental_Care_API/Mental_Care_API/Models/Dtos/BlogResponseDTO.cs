namespace Mental_Care_API.Models.Dtos
{
    public class BlogResponseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string UserId { get; set; }
        public string? UserName { get; set; }
        public string? ProfilePicture {  get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? Image { get; set; }
    }
}
