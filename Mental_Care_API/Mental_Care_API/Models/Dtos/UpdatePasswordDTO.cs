namespace Mental_Care_API.Models.Dtos
{
    public class UpdatePasswordDTO
    {
        public string UserId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
