namespace Mental_Care_API.Models.Dtos
{
    public class CheckAppointmentDTO
    {
        public string PatientId { get; set; }
        public string PatientName { get; set; }
        public string PsychologistId { get; set; }
        public string PsychologistName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
