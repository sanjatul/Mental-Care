namespace Mental_Care_API.Services
{
    public interface IImageService
    {
        Task<string> GetImage(string imageName);
        Task<bool> DeleteImage(string imageName);
        Task<string> UploadImage(string imageName, IFormFile file);
        Task<string> GetCertificate(string fileName);
        Task<bool> DeleteCertificate(string fileName);
        Task<string> UploadCertificate(string fileName, IFormFile file);
    }
}
