using Mental_Care_API.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace Mental_Care_API.Services
{
    public class ImageService : IImageService
    {
      
        private readonly ApplicationDbContext _context;

        public ImageService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> DeleteFile(string name, string path)
        {
            try
            {
                string imagePath = Path.Combine(Directory.GetCurrentDirectory(),path, name);

                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting File: {ex.Message}");

                // Return false indicating that the deletion failed
                return false;
            }
        }

        public async Task<string> GetProfilePicture(string name)
        {
            // Assuming MentuItems is an entity in your ApplicationDbContext
            var imageData = await _context.ApplicationUsers.FirstOrDefaultAsync(item => item.ProfilePicture == name);
            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "images", name);
            // Image exists in the "images" folder, return the image path
            return imagePath;

        }
        public async Task<string> GetBlogsImage(string name)
        {
            // Assuming MentuItems is an entity in your ApplicationDbContext
            var imageData = await _context.Blogs.FirstOrDefaultAsync(item => item.Image == name);
            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "blogs", name);
            // Image exists in the "images" folder, return the image path
            return imagePath;

        }
        public async Task<string> GetCertificate(string name)
        {
            // Assuming MentuItems is an entity in your ApplicationDbContext
            var imageData = await _context.DoctorDetails.FirstOrDefaultAsync(item => item.Certificate == name);
            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "blogs", name);
            // Image exists in the "images" folder, return the image path
            return imagePath;

        }

        public async Task<string> UploadFile(string name, string path, IFormFile file)
        {
            try
            {
                string imagePath = Path.Combine(Directory.GetCurrentDirectory(), path, name);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return name;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error uploading the File: {ex.Message}");
                return "";
            }
        }
    }
}