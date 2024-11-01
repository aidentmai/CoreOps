using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Message
    {
        public int messageId { get; set; }
        public string senderId { get; set; } = string.Empty;
        public string receiverId { get; set; } = string.Empty;
        public string message { get; set; } = string.Empty;
        public DateTime TimeStamp { get; set; } = DateTime.UtcNow;
        public bool seen { get; set; }
        public string ChatRoomId { get; set; } = string.Empty;

        // Navigation properties
        public User Sender { get; set; }
        public User Receiver { get; set; }

    }
}