using Mental_Care_API.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Mental_Care_API.Services
{
    public class ImageService : IImageService
    {
      
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ImageService(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        public async Task<bool> DeleteFile(string name, string path)
        {
            try
            {
                string imagePath = Path.Combine(_hostingEnvironment.WebRootPath,path, name);

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
                return false;
            }
        }

        public async Task<string> GetProfilePicture(string name)
        {
            // Assuming MentuItems is an entity in your ApplicationDbContext
            var imageData = await _context.ApplicationUsers.FirstOrDefaultAsync(item => item.ProfilePicture == name);
            string imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "images", name);
            // Image exists in the "images" folder, return the image path
            return imagePath;

        }
        public async Task<string> GetBlogsImage(string name)
        {
            var imageData = await _context.Blogs.FirstOrDefaultAsync(item => item.Image == name);
            string imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "blogs", name);
            return imagePath;

        }
        public async Task<string> GetCertificate(string name)
        {
            var imageData = await _context.PsychologistDetails.FirstOrDefaultAsync(item => item.Certificate == name);
            string imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "certificates", name);
            return imagePath;

        }

        public async Task<string> UploadFile(string name, string path, IFormFile file)
        {
            try
            {
                string imagePath = Path.Combine(_hostingEnvironment.WebRootPath, path, name);

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

        public async Task<string> SavePdfFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("No file uploaded.");

            if (!file.ContentType.Equals("application/pdf"))
                throw new ArgumentException("Only PDF files are allowed.");

            try
            {
                // Generate a unique file name to avoid collisions
                var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "certificates", fileName);

                // Ensure the directory exists
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                // Save the file to the specified path
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Return the generated file name
                return fileName;
            }
            catch (Exception ex)
            {
                // Handle exceptions (e.g., logging)
                throw new Exception($"Error saving file: {ex.Message}", ex);
            }
        }

    }
}