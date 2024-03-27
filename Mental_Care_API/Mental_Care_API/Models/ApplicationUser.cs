using Microsoft.AspNetCore.Identity;

namespace Mental_Care_API.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string Name { get; set; }
        public string ProfilePicture { get; set; }

    }
}
