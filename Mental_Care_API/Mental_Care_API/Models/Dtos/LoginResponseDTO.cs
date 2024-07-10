namespace Mental_Care_API.Models.Dtos
{
    public class LoginResponseDTO
    {
        public string Email { get; set; }
        public string UserId { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
}
