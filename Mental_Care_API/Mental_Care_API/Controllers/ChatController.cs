using Mental_Care_API.DataAccess;
using Mental_Care_API.Models;
using Mental_Care_API.Models.Dtos;
using Mental_Care_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Mental_Care_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;
        private readonly IImageService _imageService;
        private readonly string _baseUrl;
        public ChatController(ApplicationDbContext db, IImageService imageService, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _response = new ApiResponse();
            _imageService = imageService;
            var httpContext = httpContextAccessor.HttpContext;
            _baseUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host}";
        }



        [HttpPost("create-message")]
        public async Task<IActionResult> CreateMessage([FromForm] CreateMessageDTO messageDto)
        {
            try
            {
                // Check if the sender and receiver exist in the database
                var sender = await _db.ApplicationUsers.FindAsync(messageDto.Sender);
                var receiver = await _db.ApplicationUsers.FindAsync(messageDto.Receiver);

                if (sender == null || receiver == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Sender or Receiver not found.");
                    return BadRequest(_response);
                }

                // Create a new message
                var message = new Messages
                {
                    MessageSenderId = messageDto.Sender,
                    MessageReceiverId = messageDto.Receiver,
                    SentAt = DateTime.UtcNow,
                    Message = messageDto.Message,
                    isSeen = false
                };

                string? filename = null;
                if (messageDto.Document != null)
                {
                    var fileExtension = Path.GetExtension(messageDto.Document.FileName).ToLower();

                    // Check if the file is a PDF
                    if (fileExtension == ".pdf")
                    {
                        // Call the method to handle PDF files
                        var documentUrl = await _imageService.SavePdfFileAsync(messageDto.Document);
                        message.DocumentLink = documentUrl;
                    }
                    // Check if the file is an image (jpg, jpeg, png, etc.)
                    else if (fileExtension == ".jpg" || fileExtension == ".jpeg" || fileExtension == ".png")
                    {
                       

                            filename = $"{Guid.NewGuid()}{Path.GetExtension(messageDto.Document.FileName)}";
                            filename = await _imageService.UploadFile(filename, "images", messageDto.Document);
                            message.DocumentLink=filename;
                    }
                    else
                    {
                        _response.StatusCode = HttpStatusCode.UnsupportedMediaType;
                        _response.IsSuccess = false;
                        _response.ErrorMessages.Add("Unsupported file type.");
                        return BadRequest(_response);
                    }
                }


                // Save the message to the database
                _db.Messages.Add(message);
                await _db.SaveChangesAsync();

                // Return success response
                _response.StatusCode = HttpStatusCode.Created;
                _response.IsSuccess = true;
               // _response.Result = message;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost("get-messages")]
        public async Task<IActionResult> GetAllMessage([FromBody] GetAllMessagesRequestDTO usersDto)
        {
            try
            {
                // Check if the sender and receiver exist in the database
                var userOne = await _db.ApplicationUsers.FindAsync(usersDto.UserOne);
                var userTwo = await _db.ApplicationUsers.FindAsync(usersDto.UserTwo);

                if (userOne == null || userTwo == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Users not found.");
                    return BadRequest(_response);
                }
                //   ProfilePicture = $"{_baseUrl}/images/{p.ApplicationUser.ProfilePicture}",
                //Certificate = $"{_baseUrl}/certificates/{p.Certificate}",
                // Query to get all messages between the two users, ordered by newest first
                var messages = await _db.Messages
     .Where(m => (m.MessageSenderId == usersDto.UserOne && m.MessageReceiverId == usersDto.UserTwo) ||
                 (m.MessageSenderId == usersDto.UserTwo && m.MessageReceiverId == usersDto.UserOne))
     .OrderBy(m => m.SentAt) // Order messages by the sent date
     .Select(m => new GetAllMessagesDTO
     {
         SenderId = m.MessageSenderId,
         Message = m.Message,
         ProfilePicture = !string.IsNullOrEmpty(m.Sender.ProfilePicture)
             ? $"{_baseUrl}/images/{m.Sender.ProfilePicture}"
             : null, // Ensure the profile picture URL is formatted if it's not null
         DocumentLink = !string.IsNullOrEmpty(m.DocumentLink)
             ? (Path.GetExtension(m.DocumentLink).ToLower() == ".pdf"
                 ? $"{_baseUrl}/certificates/{m.DocumentLink}"
                 : $"{_baseUrl}/images/{m.DocumentLink}")
             : null,
         SentAt = m.SentAt,
         IsSeen = m.isSeen
     })
     .ToListAsync();


                // Return success response
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = messages;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }


    }
}
