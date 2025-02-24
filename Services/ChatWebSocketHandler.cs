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
        private readonly Dictionary<string, WebSocket> _connections = new Dictionary<string, WebSocket>();

        private readonly WinterContext _context;

        public WebSocketHandler(WinterContext context)
        {
            _context = context;
        }

        public async Task HandleConnectionAsync(WebSocket webSocket, string username)
        {
            _connections.Add(username, webSocket);
            await ReceiveMessagesAsync(webSocket, username);
        }

        private async Task ReceiveMessagesAsync(WebSocket webSocket, string username)
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
                        await BroadcastMessageAsync(message, username);
                    }
                }
            }
            catch (Exception)
            {
                // Handle disconnection or error
            }
            finally
            {
                _connections.Remove(username); // Clean up when user disconnects
            }
        }

        private async Task BroadcastMessageAsync(string message, string username)
        {
            // var chat_message = new ChatMessageModel
            // {
            //     Activity_id = 1,
            //     Username = username,
            //     Message = message,
            //     Timestamp = DateTime.UtcNow
            // };
            // _context.Messages.Add(chat_message);
            // await _context.SaveChangesAsync();

            var buffer = Encoding.UTF8.GetBytes(username + ": " + message);
            foreach (var connection in _connections.Values)
            {
                if (connection.State == WebSocketState.Open)
                {
                    await connection.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }
    }

}