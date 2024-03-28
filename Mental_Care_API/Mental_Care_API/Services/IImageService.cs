namespace Mental_Care_API.Services
{
    public interface IImageService
    {
        Task<string> GetProfilePicture(string name);
        Task<string> GetBlogsImage(string name);
        Task<string> GetCertificate(string name);
        Task<bool> DeleteFile(string name,string path);
        Task<string> UploadFile(string name, string path, IFormFile file);
    }
}
