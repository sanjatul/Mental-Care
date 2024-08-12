using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Mental_Care_API.Models
{
    public class Record
    {
        public int RecordId { get; set; }
        [Required]
        public string MessageSenderId { get; set; }
        [ForeignKey("MessageSenderId")]
        [ValidateNever]
        [DeleteBehavior(DeleteBehavior.Restrict)]
        public ApplicationUser Sender { get; set; }

        [Required]
        public string MessageReceiverId { get; set; }
        [ForeignKey("MessageReceiverId")]
        [DeleteBehavior(DeleteBehavior.Restrict)]
        [ValidateNever]
        public ApplicationUser Receiver { get; set; }

        [Required]
        public DateTime SentAt { get; set; }
        public string? Message { get; set; }
    }
}
