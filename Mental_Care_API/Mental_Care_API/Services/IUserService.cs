using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
namespace Mental_Care_API.Services
{
    public interface IUserService
    {
        Task<ApiResponse> GetPsycologists();
        Task<ApiResponse> GetPsycologist(string Id);
        Task<ApiResponse> UpdatePsycologist(string Id);
        Task<ApiResponse> DeletePsycologist(string Id);
        Task<List<GeneralUserDetailsDTO>> GetUsers();
        Task<GeneralUserDetailsDTO> GetUser(string Id);
        Task<bool> DeleteUser(string Id);

    }
}
