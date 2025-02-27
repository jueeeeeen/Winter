using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Winter_Project.Models;

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
            // using (var scope = _scopeFactory.CreateScope())
            //     {
            //         var dbContext = scope.ServiceProvider.GetRequiredService<WinterContext>();

            //         var chatMessage = new ChatMessageModel
            //         {
            //             Activity_id = activity_id,
            //             Username = username,
            //             Message = message,
            //             Timestamp = DateTime.UtcNow
            //         };

            //         dbContext.ChatMessages.Add(chatMessage);
            //         await dbContext.SaveChangesAsync(CancellationToken.None);
            // }

            if (!_group_connections.ContainsKey(activity_id))
            {
                _group_connections[activity_id] = new Dictionary<string, WebSocket>(); // Initialize group if missing
            }

            _group_connections[activity_id][username] = webSocket; // Add/Update user connection

            //debug
            Console.WriteLine($"User {username} joined activity {activity_id}");
            Console.WriteLine("Current Connections:");
            foreach (var (groupId, users) in _group_connections)
            {
                Console.WriteLine($"Activity ID: {groupId}");
                foreach (var (user, socket) in users)
                {
                    Console.WriteLine($"  - Username: {user}, WebSocket State: {socket.State}");
                }
            }

            await ReceiveMessagesAsync(webSocket, activity_id, username);
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
                using (var scope = _scopeFactory.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<WinterContext>();

                    var chatMessage = new ChatMessageModel
                    {
                        Activity_id = activity_id,
                        Username = username,
                        Message = message,
                        Timestamp = DateTime.UtcNow
                    };

                    dbContext.ChatMessages.Add(chatMessage);
                    await dbContext.SaveChangesAsync(CancellationToken.None);
                }

                var buffer = Encoding.UTF8.GetBytes($"{username}: {message}");
                Console.WriteLine("Broadcasting message...");

                // 🔹 Check if the group exists before accessing it
                if (!_group_connections.ContainsKey(activity_id)) 
                {
                    Console.WriteLine($"No active connections for activity {activity_id}");
                    return;
                }

                var connections = _group_connections[activity_id].Values.ToList();

                foreach (var connection in connections)
                {
                    Console.WriteLine($"Checking connection {connection.State}");
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