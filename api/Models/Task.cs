using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Interfaces;

namespace api.Models
{
    public class Task
    {
        public int taskId { get; set; }
        public string title { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public Status status { get; set; }
        public Priority priority { get; set; }
        public DateTime dueDate { get; set; }
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;
        public User User { get; set; }
        public string userId { get; set; }
        public Team Team { get; set; }
        public int teamId { get; set; }
    }
}