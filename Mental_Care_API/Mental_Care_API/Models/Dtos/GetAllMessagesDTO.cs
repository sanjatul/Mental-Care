namespace Mental_Care_API.Models.Dtos
{
    public class GetAllMessagesDTO
    {
        required
        public string SenderId
        { get; set; }
        public string ProfilePicture { get; set; }
        public string? Message  { get; set;}
        public string? DocumentLink { get; set; }
        public DateTime SentAt { get; set; }
        public bool IsSeen { get; set; }
    }
}
