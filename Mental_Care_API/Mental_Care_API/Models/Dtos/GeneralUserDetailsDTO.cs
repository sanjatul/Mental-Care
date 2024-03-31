namespace Mental_Care_API.Models.Dtos
{
    public class GeneralUserDetailsDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public int Age {  get; set; }
        public string ProfilePicture { get; set; }
    }
}
