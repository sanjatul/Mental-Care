namespace Mental_Care_API.Models.Dtos
{
    public class CreateMessageDTO
    {
        required
        public string Sender { get; set; }
        required
        public string Receiver { get; set; }
        public string? Message { get; set; }
        public IFormFile? Document { get; set; }
    }
}
