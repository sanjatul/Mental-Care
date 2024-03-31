using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
using Mental_Care_API.Services;
using Mental_Care_API.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Mental_Care_API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private string? secretKey;
        private readonly IImageService _imageService;
        public AuthController(ApplicationDbContext db, IConfiguration configuration,
            UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,IImageService imageService)
        {
            _db = db;
            _response = new ApiResponse();
            secretKey = configuration.GetValue<string>("ApiSettings:Secret");
            _userManager = userManager;
            _roleManager = roleManager;
            _imageService = imageService;
        }
        [HttpPost("general-register")]
        public async Task<IActionResult> GeneralRegister([FromForm] GeneralRegisterRequestDTO model)
        {
            ApplicationUser? userFromDb = await _db.ApplicationUsers
                .FirstOrDefaultAsync(u => u.UserName.ToLower() == model.UserName.ToLower());

            if (userFromDb != null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Email already exists");
                return BadRequest(_response);
            }
            string filename = $"{Guid.NewGuid()}{Path.GetExtension(model.File.FileName)}";

            string normalizedGender = model.Gender.ToLower();
            string gender;
            switch (normalizedGender)
            {
                case "male":
                    gender = "Male";
                    break;
                case "female":
                    gender = "Female";
                    break;
                default:
                    gender = "Others";
                    break;
            }

            ApplicationUser newUser = new()
            {
                UserName = model.UserName,
                Email = model.UserName,
                NormalizedEmail = model.UserName.ToUpper(),
                Name = model.Name,
                PhoneNumber=model.PhoneNumber,
                Age=model.Age,
                Gender= gender,
                ProfilePicture= await _imageService.UploadFile(filename,"images", model.File)
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
                if (result.Succeeded)
                {
                    if (!_roleManager.RoleExistsAsync(SD.Role_Admin).GetAwaiter().GetResult())
                    {
                        //create roles in database
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Admin));
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_User));
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Psycologist));
                    }
                    if (model.Role.ToLower() == SD.Role_Admin)
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_Admin);
                    }
                    else if(model.Role.ToLower()==SD.Role_Psycologist)
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_Psycologist);
                       
                    }
                     else
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_User);
                    }

                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
            }
            catch (Exception)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while registering");
                return BadRequest(_response);
            }
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.IsSuccess = false;
            _response.ErrorMessages.Add("Error while registering");
            return BadRequest(_response);

        }



        [HttpPost("psycologist-register")]
        public async Task<IActionResult> PsycologistRegister([FromForm] PsychologistRegisterRequestDTO model)
        {
            ApplicationUser? userFromDb = await _db.ApplicationUsers
                .FirstOrDefaultAsync(u => u.UserName.ToLower() == model.UserName.ToLower());

            if (userFromDb != null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Email already exists");
                return BadRequest(_response);
            }
            string filename = $"{Guid.NewGuid()}{Path.GetExtension(model.File.FileName)}";
            string normalizedGender = model.Gender.ToLower();
            string gender;
            switch (normalizedGender)
            {
                case "male":
                    gender = "Male";
                    break;
                case "female":
                    gender = "Female";
                    break;
                default:
                    gender = "Others";
                    break;
            }

            ApplicationUser newUser = new()
            {
                UserName = model.UserName,
                Email = model.UserName,
                NormalizedEmail = model.UserName.ToUpper(),
                Name = model.Name,
                PhoneNumber = model.PhoneNumber,
                Age = model.Age,
                Gender = gender,
                ProfilePicture = await _imageService.UploadFile(filename,"images", model.File)
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
                if (result.Succeeded)
                {
                    if (!_roleManager.RoleExistsAsync(SD.Role_Admin).GetAwaiter().GetResult())
                    {
                        //create roles in database
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Admin));
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_User));
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Psycologist));
                    }
                    
                    if (model.Role.ToLower() == SD.Role_Psycologist)
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_Psycologist);

                    }
                    else
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        _response.ErrorMessages.Add("Error while registering");
                        return BadRequest(_response);
                    }
                    string certificatename = $"{Guid.NewGuid()}{Path.GetExtension(model.File.FileName)}";
                    PsychologistDetails details = new()
                    {
                        UserId = newUser.Id,
                        Location = model.Location,
                        IsApproved=false,
                        Certificate = await _imageService.UploadFile(certificatename, "certificates", model.Certificate)
                    };
                    await _db.PsychologistDetails.AddAsync(details);
                    await _db.SaveChangesAsync();

                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    return Ok(_response);
                }
            }
            catch (Exception)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while registering");
                return BadRequest(_response);
            }
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.IsSuccess = false;
            _response.ErrorMessages.Add("Error while registering");
            return BadRequest(_response);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            ApplicationUser? userFromDb = _db.ApplicationUsers
                    .FirstOrDefault(u => u.UserName.ToLower() == model.UserName.ToLower());

            bool isValid = await _userManager.CheckPasswordAsync(userFromDb, model.Password);

            if (isValid == false)
            {
                _response.Result = new LoginResponseDTO();
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Username or password is incorrect");
                return BadRequest(_response);
            }

            //we have to generate JWT Token
            var roles = await _userManager.GetRolesAsync(userFromDb);
            JwtSecurityTokenHandler tokenHandler = new();
            byte[] key = Encoding.ASCII.GetBytes(secretKey);

            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("id", userFromDb.Id.ToString()),
                    new Claim(ClaimTypes.Email, userFromDb.UserName.ToString()),
                    new Claim(ClaimTypes.Role, roles.FirstOrDefault()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            LoginResponseDTO loginResponse = new()
            {
                Email = userFromDb.Email,
                UserId=userFromDb.Id,
                Token = tokenHandler.WriteToken(token)
            };

            if (loginResponse.Email == null || string.IsNullOrEmpty(loginResponse.Token))
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Username or password is incorrect");
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = loginResponse;
            return Ok(_response);

        }

    }
}
