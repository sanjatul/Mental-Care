namespace Mental_Care_API.Models.Dtos
{
    public class GeneralRegisterRequestDTO
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public IFormFile File { get; set; }
       
    }
}
