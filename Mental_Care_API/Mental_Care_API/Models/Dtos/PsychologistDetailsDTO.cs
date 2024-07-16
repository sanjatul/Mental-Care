namespace Mental_Care_API.Models.Dtos
{
        public class PsychologistDetailsDTO
    {
            public int DoctorId { get; set; }
            public string UserId { get; set; }
            public string Name { get; set; }
            public string ProfilePicture { get; set; }
            public string Phone { get; set; }
            public int Age { get; set; }
            public string Gender { get; set; }
            public string Email { get; set; } // Added email property
            public bool? IsApproved { get; set; }
            public string Location { get; set; }
            public int? YearsOfExperience { get; set; }
            public string Certificate { get; set; }
            public double Fees { get; set; }
            public ICollection<ExperienceResopnseDTO> Experiences { get; set; }
            public ICollection<EducationResopnseDTO> Educations { get; set; }
        }
}
