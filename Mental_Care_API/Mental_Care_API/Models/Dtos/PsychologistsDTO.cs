namespace Mental_Care_API.Models.Dtos
{
    public class PsychologistsDTO
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsApproved {  get; set; }
        public string? Gender {  get; set; }
        public string ProfilePicture { get; set; }
        public string Certificate { get; set; }
        public string Location { get; set; }
        public string? Designation { get; set; }
        public string? Speciality { get; set; }
        public string? WorkPlace { get; set; }
        public int? YearsOfExperience { get; set; }
    }
}
