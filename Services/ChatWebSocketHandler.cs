using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Winter_Project.Models;
using System.Text.Json;

namespace Winter_Project.Services
{
    public class WebSocketHandler
    {
        private static readonly Dictionary<int, Dictionary<string, WebSocket>> _group_connections = new();
        private readonly IServiceScopeFactory _scopeFactory;

        public WebSocketHandler(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public async Task HandleConnectionAsync(WebSocket webSocket, int activity_id, string username)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<WinterContext>();
                if (!IsValidParticipant(dbContext, activity_id, username))
                {
                    Console.WriteLine("User doesnt not belong to the activity member");
                    return;
                }
                AddToGroupConnections(activity_id, username, webSocket);
                LogCurrentConnections();
                await ReceiveMessagesAsync(webSocket, activity_id, username);
            }
        }

        private static bool IsValidParticipant(WinterContext dbContext, int activity_id, string username)
        {
            return dbContext.Activities
                .Where(a => a.Activity_id == activity_id)
                .SelectMany(a => a.Participants)
                .Any(p => p.Username == username && ( p.Role == "member" || p.Role == "host"));
        }

        private static void AddToGroupConnections(int activity_id, string username, WebSocket webSocket)
        {
            if (!_group_connections.ContainsKey(activity_id))
            {
                _group_connections[activity_id] = new Dictionary<string, WebSocket>(); // Initialize group if missing
            }

            _group_connections[activity_id][username] = webSocket; // Add/Update user connection
        }

        private void LogCurrentConnections()
        {
            Console.WriteLine("Current Connections:");
            foreach (var (groupId, users) in _group_connections)
            {
                Console.WriteLine($"Activity ID: {groupId}");
                foreach (var (user, socket) in users)
                {
                    Console.WriteLine($"  - Username: {user}, WebSocket State: {socket.State}");
                }
            }
        }

        private async Task ReceiveMessagesAsync(WebSocket webSocket, int activity_id, string username)
        {
            var buffer = new byte[1024 * 4];
            WebSocketReceiveResult result;
            try
            {
                while (webSocket.State == WebSocketState.Open)
                {
                    result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        await BroadcastMessageAsync(activity_id, username, message);
                    }
                }
            }
            finally
            {
                if (_group_connections.ContainsKey(activity_id))
                {
                    _group_connections[activity_id].Remove(username); // Remove only the disconnected user
                    // If the group is empty, remove it completely
                    if (_group_connections[activity_id].Count == 0)
                    {
                        _group_connections.Remove(activity_id);
                    }
                }
            }
        }

        private async Task BroadcastMessageAsync(int activity_id, string username, string message)
        {
            try
            {
                var now = DateTime.UtcNow;
                Console.WriteLine(now);
                using (var scope = _scopeFactory.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<WinterContext>();
                    var chat_message = new ChatMessageModel
                    {
                        Activity_id = activity_id,
                        Username = username,
                        Message = message,
                        Timestamp = now
                    };
                    dbContext.ChatMessages.Add(chat_message);
                    await dbContext.SaveChangesAsync(CancellationToken.None);
                }

                var chatMessageJson = new
                {
                    Username = username,
                    Message = message,
                    Timestamp = now
                };
                var jsonMessage = JsonSerializer.Serialize(chatMessageJson);

                var buffer = Encoding.UTF8.GetBytes(jsonMessage);

                if (!_group_connections.ContainsKey(activity_id)) 
                {
                    return;
                }

                var connections = _group_connections[activity_id].Values.ToList();

                foreach (var connection in connections)
                {
                    if (connection.State == WebSocketState.Open)
                    {
                        await connection.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                        Console.WriteLine("Message sent!");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database save error: {ex.Message}");
            }
        }
    }
}