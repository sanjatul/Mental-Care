namespace Mental_Care_API.Models.Dtos
{
    public class HistoryBookedAppointmentDTO
    {
        public int AppointmentHistoryId { get; set; }
        public int AppointmentId { get; set; }
        public string PatientId { get; set; }
        public String Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsOnline { get; set; }
    }
}
