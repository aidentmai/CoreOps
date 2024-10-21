using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.DTOs.Task
{
    public class CreateTaskRequestDTO
    {
        [Required]
        [MaxLength(50, ErrorMessage = "Title must be less than 50 characters long")]
        public string title { get; set; } = string.Empty;
        [Required]
        [MaxLength(200, ErrorMessage = "Description must be less than 200 characters long")]
        public string description { get; set; } = string.Empty;        
        public Status status { get; set; }
        public Priority priority { get; set; }
        public DateTime dueDate { get; set; }
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;
        public string userId { get; set; }
        public int teamId { get; set; }
    }
}