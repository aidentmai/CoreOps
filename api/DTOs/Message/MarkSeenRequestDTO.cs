using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Message
{
    public class MarkSeenRequestDTO
    {
        public int messageId { get; set; }
    }
}