using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Message;
using api.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IHubContext<ChatHub> _hubContext;

        public MessageController(ApplicationDBContext context, IHubContext<ChatHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpGet("{chatRoomId}")]
        public async Task<IActionResult> GetMessages(string chatRoomId)
        {
            var messages = await _context.Messages
                                .Where(m => m.ChatRoomId == chatRoomId)
                                .OrderBy(m => m.TimeStamp)
                                .ToListAsync();

            return Ok(messages);
        }

        [HttpPost("mark-seen")]
        public async Task<IActionResult> MarkMessageAsSeen([FromBody] MarkSeenRequestDTO request)
        {
            var message = await _context.Messages.FindAsync(request.messageId);

            if (message == null)
            {
                return NotFound();
            }

            // Update the seen property
            message.seen = true;
            await _context.SaveChangesAsync();

            // Notify clients that the message has been seen
            await _hubContext.Clients.Group(message.ChatRoomId).SendAsync("MarkMessageSeen", message.messageId);

            return Ok(message);
        }
    }
}