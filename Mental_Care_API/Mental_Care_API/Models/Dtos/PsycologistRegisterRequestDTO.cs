namespace Mental_Care_API.Models.Dtos
{
    public class PsycologistRegisterRequestDTO
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }
        public string? Location { get; set; }
        public IFormFile File { get; set; }
        public IFormFile Certificate { get; set; }

    }
}
