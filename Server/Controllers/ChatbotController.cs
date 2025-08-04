using _.Models;
using _.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Security.Claims;

namespace AuthApi.Controllers;

public class SendMessageRequest
{
    public string ChatbotId { set; get; } = "";
    public string UserMessage { set; get; } = "";
}

[ApiController]
[Route("chatbot")]
public class ChatbotController : ControllerBase
{
    private readonly ChatbotService _service;

    public ChatbotController(ChatbotService service)
    {
        _service = service;
    }

    private string? GetUserEmail()
    {
        return User.FindFirstValue(ClaimTypes.Email);
    }

    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] Chatbot bot)
    {
        var userEmail = GetUserEmail();
        if (userEmail == null) return Unauthorized();

        bot.Owner = userEmail;
        await _service.CreateAsync(bot);
        return Ok(new { message = "Chatbot created." });
    }

    [HttpPut("update/{id}")]
    [Authorize]
    public async Task<IActionResult> Update(string id, [FromBody] Chatbot bot)
    {
        var userEmail = GetUserEmail();

        if (userEmail == null || bot.Owner != userEmail) return Unauthorized();

        bot.Id = id;
        await _service.UpdateAsync(id, bot);
        return Ok(new { message = "Chatbot updated." });
    }

    [HttpGet("find-all")]
    [Authorize]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {

        var userEmail = GetUserEmail();
        Console.WriteLine("User email", userEmail);

        if (userEmail == null) return Unauthorized();

        var results = await _service.GetByOwnerAsync(userEmail, page, pageSize);
        return Ok(results);
    }

    [HttpDelete("delete/{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        await _service.DeleteAsync(id);
        return Ok(new { message = "Chatbot deleted." });
    }

    [HttpPost("send-message")]
    [Authorize]
    public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
    {
        Console.WriteLine("#AQUI");
        var userEmail = User.FindFirstValue(ClaimTypes.Email);
        if (userEmail == null) return Unauthorized();

        Console.WriteLine("#AQUI 2");

        var bot = await _service.GetByIdAsync(request.ChatbotId);
        if (bot == null || bot.Owner != userEmail)
            return NotFound("Chatbot not found or not owned by user.");

        Console.WriteLine("#AQUI 3");
        // Append user's new message
        bot.Messages.Add(new ChatMessage() { Role = "user", Content = request.UserMessage });
        Console.WriteLine("#AQUI 4");

        // Build the message history including system context
        var fullMessages = new List<object>
    {
        new { role = "system", content = bot.Description }
    };
        fullMessages.AddRange(bot.Messages.Select(m => new { role = m.Role, content = m.Content }));
        Console.WriteLine("#AQUI 5");

        // Send to Ollama
        var ollamaRequest = new
        {
            model = "llama3",
            messages = fullMessages
        };
        Console.WriteLine("#AQUI 6");
        Console.WriteLine(ollamaRequest.ToJson());
        var httpClient = new HttpClient();
        var response = await httpClient.PostAsJsonAsync("http://localhost:11434/v1/chat/completions", ollamaRequest);
        if (response.IsSuccessStatusCode)
        {
            Console.Write("\n$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");
            Console.WriteLine(" request contnet", response.Content.ReadAsStringAsync());
            Console.WriteLine("request msg", response?.RequestMessage?.ToString());
            Console.WriteLine("res", response?.ToString());

            if (response?.Content != null)
            {
                Console.WriteLine("Content Headers:");
                foreach (var header in response.Content.Headers)
                {
                    Console.WriteLine($"  {header.Key}: {string.Join(", ", header.Value)}");
                }

                string? content = response.Content != null ? await response.Content.ReadAsStringAsync() : null;
                Console.WriteLine("Body:");
                Console.WriteLine(content);
                
            }
            // Console.WriteLine(response.Content.ToJson().ToString());
        }
        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "Failed to communicate with Ollama");
        Console.WriteLine("#AQUI 7");

        var resultJson = await response.Content.ReadFromJsonAsync<OllamaChatResponse>();
        Console.WriteLine("reulst jsn", resultJson );
        var assistantReply = resultJson?.Choices?.FirstOrDefault()?.Message.Content;
        Console.WriteLine($"repy: {assistantReply}");

        if (string.IsNullOrWhiteSpace(assistantReply))
            return StatusCode(500, "Ollama did not return a valid response");

        // Append assistant message to history
        bot.Messages.Add(new ChatMessage
        {
            Role = "assistant",
            Content = assistantReply
        });
        // Save updates
        await _service.UpdateAsync(bot.Id!, bot);

        return Ok(new
        {
            reply = assistantReply
        });
    }
}
