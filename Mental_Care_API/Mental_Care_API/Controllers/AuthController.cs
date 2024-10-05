using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
using Mental_Care_API.Services;
using Mental_Care_API.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
        private readonly IEmailService _emailService;
        public AuthController(ApplicationDbContext db, IConfiguration configuration,
            UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,IImageService imageService, IEmailService emailService)
        {
            _db = db;
            _response = new ApiResponse();
            secretKey = configuration.GetValue<string>("ApiSettings:Secret");
            _userManager = userManager;
            _roleManager = roleManager;
            _imageService = imageService;
            _emailService = emailService;
        }


        [HttpPost("general-register")]
        public async Task<IActionResult> GeneralRegister([FromForm] GeneralRegisterRequestDTO model)
        {
            ApplicationUser? userFromDb = await _db.ApplicationUsers
                .FirstOrDefaultAsync(u => u.UserName.ToLower() == model.Email.ToLower());

            if (userFromDb != null)
            {
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Email already exists");
                return Ok(_response);
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
                UserName = model.Email,
                Email = model.Email,
                NormalizedEmail = model.Email.ToUpper(),
                Name = model.Name,
                PhoneNumber = model.PhoneNumber,
                Age = model.Age,
                Gender = gender,
                ProfilePicture = await _imageService.UploadFile(filename, "images", model.File)
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
                if (result.Succeeded)
                {
                    // Create roles if they don't exist
                    if (!_roleManager.RoleExistsAsync(SD.Role_Admin).GetAwaiter().GetResult())
                    {
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Admin));
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_User));
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Psycologist));
                    }

                    // Assign role based on the user input
                    if (model.Role.ToLower() == SD.Role_Admin)
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_Admin);
                    }
                    else if (model.Role.ToLower() == SD.Role_Psycologist)
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_Psycologist);
                    }
                    else
                    {
                        await _userManager.AddToRoleAsync(newUser, SD.Role_User);
                    }

                    // Generate the email confirmation token
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                    // Create email confirmation link
                    var confirmationLink = Url.Action(
                        "EmailVerification",  // Action method to verify email
                        "Auth",  // Controller name
                        new { email = newUser.Email, code = WebUtility.UrlEncode(code) },  // Route parameters
                        Request.Scheme);  // Scheme to generate a full URL (e.g., http/https)

                    // Construct the email body
                    var body = $"<div>Click the following link to verify your email: <a href='{confirmationLink}'>Verify Email</a></div>";

                    // Send email
                    var sendEmail = await _emailService.SendEmailAsync(newUser.Email, "Mental Care: Confirm Your Email", body);

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
                .FirstOrDefaultAsync(u => u.UserName.ToLower() == model.Email.ToLower());

            if (userFromDb != null)
            {
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Email already exists");
                return Ok(_response);
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
                UserName = model.Email,
                Email = model.Email,
                NormalizedEmail = model.Email.ToUpper(),
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
                    PsychologistDetails details = new()
                    {
                        UserId = newUser.Id,
                        Location = model.Location,
                        Certificate = await _imageService.SavePdfFileAsync(model.Certificate),
                    };


                    await _db.PsychologistDetails.AddAsync(details);
                    await _db.SaveChangesAsync();
                    // Generate the email confirmation token
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                    // Create email confirmation link
                    var confirmationLink = Url.Action(
                        "EmailVerification",  // Action method to verify email
                        "Auth",  // Controller name
                        new { email = newUser.Email, code = WebUtility.UrlEncode(code) },  // Route parameters
                        Request.Scheme);  // Scheme to generate a full URL (e.g., http/https)

                    // Construct the email body
                    var body = $"<div>Click the following link to verify your email: <a href='{confirmationLink}'>Verify Email</a></div>";

                    // Send email
                    var sendEmail = await _emailService.SendEmailAsync(newUser.Email, "Mental Care: Confirm Your Email", body);
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
        public async Task<IActionResult> ChangePassword([FromBody] LoginRequestDTO model)
        {
            ApplicationUser? userFromDb = _db.ApplicationUsers
                    .FirstOrDefault(u => u.UserName.ToLower() == model.UserName.ToLower());

            bool isValid = await _userManager.CheckPasswordAsync(userFromDb, model.Password);

            if (userFromDb is null || isValid == false || userFromDb.EmailConfirmed == false)
            {
                _response.Result = new LoginResponseDTO();
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Username or password is incorrect");
                return Ok(_response);
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
                Role = roles[0],
                UserId = userFromDb.Id,
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


        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] ResetPasswordDTO model)
        {
            // Find the user by email
            ApplicationUser? userFromDb = await _userManager.FindByEmailAsync(model.Email);

            if (userFromDb == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("User not found");
                return BadRequest(_response);
            }

            // Check if the old password is correct
            bool isOldPasswordValid = await _userManager.CheckPasswordAsync(userFromDb, model.OldPassword);

            if (!isOldPasswordValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Old password is incorrect");
                return BadRequest(_response);
            }

            // Reset the password
            IdentityResult result = await _userManager.ChangePasswordAsync(userFromDb, model.OldPassword, model.NewPassword);

            if (result.Succeeded)
            {
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = "Password reset successfully";
                return Ok(_response);
            }
            else
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(_response);
            }
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(RequestForgotPassword request)
        {
            if(ModelState.IsValid)
            {
                var user=await _userManager.FindByEmailAsync(request.Email);
                if(user == null) {
                    return BadRequest("Invalid payload");
                }
                
                var token=await _userManager.GeneratePasswordResetTokenAsync(user);
                if(token == null)
                {
                    return BadRequest("something went wrong");
                }
                //sending email

                // Preparing the response
                var response = new
                {
                    Email = request.Email,
                    Token = token
                };

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = response;
                return Ok(_response);
            }
            return BadRequest("Invalid Payload");
        }

        [HttpGet("EmailVerification")]
        public async Task<IActionResult> EmailVerification(string? email, string? code)
        {
            if (email == null || code == null)
                return BadRequest("Invalid");

            var user=await _userManager.FindByEmailAsync(email);
            if(user == null)
            {
                return BadRequest("Invalid");
            }
            var isVerified=await _userManager.ConfirmEmailAsync(user,code);
            if (isVerified.Succeeded)
            {
                return Redirect("http://localhost:5173");
            }
            return BadRequest("Something went wrong");
        }

    }
}
