using Mental_Care_API.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace Mental_Care_API.Services
{
    public class ImageService : IImageService
    {
        private readonly string _imagesFolderPath;
        private readonly string _certificateFolderPath;
        private readonly ApplicationDbContext _context;

        public ImageService(ApplicationDbContext context)
        {
            _context = context;
            // Get the path to the "images" folder within the project
            _imagesFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
            _certificateFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "certificates");
        }
        public async Task<bool> DeleteImage(string imageName)
        {
            try
            {
                string imagePath = Path.Combine(_imagesFolderPath, imageName);

                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting image: {ex.Message}");

                // Return false indicating that the deletion failed
                return false;
            }
        }

        public async Task<string> GetImage(string imageName)
        {
            // Assuming MentuItems is an entity in your ApplicationDbContext
            var imageData = await _context.ApplicationUsers.FirstOrDefaultAsync(item => item.ProfilePicture == imageName);
            string imagePath = Path.Combine(_imagesFolderPath, imageName);
            // Image exists in the "images" folder, return the image path
            return imagePath;

        }

        public async Task<string> UploadImage(string imageName, IFormFile file)
        {
            try
            {
                string imagePath = Path.Combine(_imagesFolderPath, imageName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return imageName;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error uploading the image: {ex.Message}");
                return "";
            }
        }

        public async Task<bool> DeleteCertificate(string fileName)
        {
            try
            {
                string imagePath = Path.Combine(_certificateFolderPath, fileName);

                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting image: {ex.Message}");

                // Return false indicating that the deletion failed
                return false;
            }
        }

        public async Task<string> GetCertificate(string fileName)
        {
            // Assuming MentuItems is an entity in your ApplicationDbContext
            var imageData = await _context.DoctorDetails.FirstOrDefaultAsync(item => item.Certificate == fileName);
            string imagePath = Path.Combine(_certificateFolderPath, fileName);
            // Image exists in the "images" folder, return the image path
            return imagePath;

        }

        public async Task<string> UploadCertificate(string fileName, IFormFile file)
        {
            try
            {
                string imagePath = Path.Combine(_certificateFolderPath, fileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return fileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error uploading the image: {ex.Message}");
                return "";
            }
        }
    }
}