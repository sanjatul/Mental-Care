namespace Mental_Care_API.Models.Dtos
{
    public class PsychologistRegisterRequestDTO
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }
        public string? Location { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public IFormFile File { get; set; }
        public IFormFile Certificate { get; set; }

    }
}
