using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mental_Care_API.Models
{
    public class Messages
    {
        [Key]
        public int MessageId { get; set; }

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
        public string? Message { get; set; } = string.Empty;
        public string? DocumentLink { get; set; }=string.Empty;
        public bool isSeen { get; set; }=false;

    }
}
