using System.Threading.Tasks;
using api.Controllers;
using api.Data;
using api.DTOs.Message;
using api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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

        public async System.Threading.Tasks.Task JoinChat(UserConnection connection)
        {
            await Clients.All.SendAsync("ReceiveMessage", connection.userName, $"{connection.userName} has joined the chat");
        }

        public async System.Threading.Tasks.Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
            _chatDB.connections[Context.ConnectionId] = connection;

            await Clients.Group(connection.ChatRoom)
                .SendAsync("JoinSpecificChatRoom", connection.userName, $"{connection.userName} has joined {connection.ChatRoom}");
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
                ChatRoomId = message.ChatRoomId,
                seen = false
            };

            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();

            // Map the new message back to the DTO to return the created message
            message.messageId = newMessage.messageId;

            Console.WriteLine("Sending message to group with content: " + JsonConvert.SerializeObject(message));
            Console.WriteLine($"Broadcasting to group: {groupName}");

            // Broadcast the message to the group
            await Clients.Group(groupName).SendAsync("ReceiveMessage", message);
            await Clients.Group(groupName).SendAsync("NewMessageNotification", message);

            return message;
        }

        public async System.Threading.Tasks.Task MarkMessageAsSeen(int messageId)
        {
            // Find the message in the database
            var message = await _context.Messages.FindAsync(messageId);
            if (message != null)
            {
                message.seen = true; // Mark the message as seen
                await _context.SaveChangesAsync();

                // Notify all clients in the group about the seen status
                await Clients.Group(message.ChatRoomId).SendAsync("MarkMessageSeen", messageId);
            }
        }
        
        private string GetGroupName(string senderId, string receiverId)
            {
                var stringCompare = string.CompareOrdinal(senderId, receiverId) < 0;
                return stringCompare ? $"{senderId}-{receiverId}" : $"{receiverId}-{senderId}";
        }
    }
}
