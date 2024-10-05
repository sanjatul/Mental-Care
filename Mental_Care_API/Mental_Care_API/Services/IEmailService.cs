namespace Mental_Care_API.Services
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(string to, string subject, string message);
    }
}
