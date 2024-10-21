using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.DTOs.Task
{
    public class TaskDTO
    {
        public int taskId { get; set; }
        public string title { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public Status status { get; set; } // "open", "in progress", "completed"
        public Priority priority { get; set; } // "low", "medium", "high"
        public DateTime dueDate { get; set; }
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;
        public string userId { get; set; }
        public int teamId { get; set; }
    }
}