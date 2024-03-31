namespace Mental_Care_API.Models.Dtos
{
    public class ExperienceResopnseDTO
    {
        public int ExperienceId { get; set; }
        public string Designation { get; set; }
        public string Speciality { get; set; }
        public string WorkPlace { get; set; }
        public bool? IsDisplay { get; set; }
        public DateTime StatingTime { get; set; }
        public DateTime? EndingTime { get; set; }
    }
}
