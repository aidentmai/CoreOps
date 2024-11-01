using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Message
{
    public class MessageDTO
    {
        public int messageId { get; set; }
        public string senderId { get; set; }
        public string receiverId { get; set; }
        public string message { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.UtcNow;
        public bool seen { get; set; }
        public string ChatRoomId { get; set; }
    }
}