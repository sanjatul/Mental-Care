namespace Mental_Care_API.Models.Dtos
{
    public class UserBookedScheduleDetailsDTO
    {
        public int AppointmentHistoryId { get; set; }
        public int AppointmentId { get; set; }
        public string PsychologistId { get; set; }
        public String PsychologistName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsOnline { get; set; }
    }
}
