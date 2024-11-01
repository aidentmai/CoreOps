using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public MessageController(ApplicationDBContext context)
        {
            _context = context;
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
    }
}