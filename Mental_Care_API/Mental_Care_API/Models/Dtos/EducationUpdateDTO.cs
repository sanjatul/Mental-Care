namespace Mental_Care_API.Models.Dtos
{
    public class EducationUpdateDTO
    {
        public int EducationId { get; set; }
        public string UserId { get; set; }
        public string Degree { get; set; }
        public string Institute { get; set; }
        public DateTime StatingTime { get; set; }
        public DateTime? EndingTime { get; set; }
    }
}
