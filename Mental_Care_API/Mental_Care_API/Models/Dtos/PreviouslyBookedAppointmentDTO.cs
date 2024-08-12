namespace Mental_Care_API.Models.Dtos
{
    public class PreviouslyBookedAppointmentDTO
    {
        public int AppointmentHistoryId { get; set; }
        public int AppointmentId { get; set; }
        public string PsychologistId { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsOnline { get; set; }
    }
}
