namespace Mental_Care_API.Models.Dtos
{
    public class GetAllMessagesRequestDTO
    {
        required
        public string UserOne { get; set; }
        required
        public string UserTwo { get; set; }
    }
}
