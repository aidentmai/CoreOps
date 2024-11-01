using System.Threading.Tasks;
using api.Data;
using api.DTOs.Message;
using api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatDB _chatDB; // Manages in-memory connections
        private readonly ApplicationDBContext _context; // Handles database operations

        public ChatHub(ChatDB chatDB, ApplicationDBContext context)
        {
            _chatDB = chatDB;
            _context = context;
        }

        public async System.Threading.Tasks.Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
            _chatDB.connections[Context.ConnectionId] = connection;

            await Clients.Group(connection.ChatRoom)
                .SendAsync("ReceiveMessage", "admin", $"{connection.userName} has joined {connection.ChatRoom}");
        }

        public async Task<MessageDTO> SendMessage(MessageDTO message)
        {
            if (string.IsNullOrWhiteSpace(message.message))
            {
                throw new ArgumentNullException(nameof(message.message), "Message content cannot be null or empty.");
            }
            string groupName = GetGroupName(message.senderId, message.receiverId);

            // Save the message to the database
            var newMessage = new Message
            {
                senderId = message.senderId,
                receiverId = message.receiverId,
                message = message.message,
                TimeStamp = DateTime.UtcNow,
                ChatRoomId = message.ChatRoomId
            };

            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();

            // Map the new message back to the DTO to return the created message
            message.messageId = newMessage.messageId;

            // Broadcast the message to the group
            await Clients.Group(groupName).SendAsync("ReceiveMessage", message);

            return message;
        }
        private string GetGroupName(string senderId, string receiverId)
            {
                var stringCompare = string.CompareOrdinal(senderId, receiverId) < 0;
                return stringCompare ? $"{senderId}-{receiverId}" : $"{receiverId}-{senderId}";
        }
    }
}
