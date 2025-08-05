using _.ChatbotManager.Application.Services;
using _.Models;
using _.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Net;
using System.Security.Claims;
using System.Text.Json.Serialization;
using _.ChatbotManager.Infrastructure.Ollama;
using Microsoft.Extensions.Options;

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
    private readonly RedisCacheService _cache;
    private readonly string _ollamaUrl;
     public ChatbotController(ChatbotService service, RedisCacheService cache,  IConfiguration config )
    {
        _service = service;
        _cache = cache;
        _ollamaUrl = config["Ollama:BaseUrl"];
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

        await _cache.RemoveAsync($"chatbots:{userEmail}:page:1");


        bot.Id = id;
        await _service.UpdateAsync(id, bot);
        return Ok(new { message = "Chatbot updated." });
    }

    [HttpGet("find-all")]
    [Authorize]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var userEmail = GetUserEmail();

        if (userEmail == null) return Unauthorized();

        var cacheKey = $"chatbots:{userEmail}:page:{page}";
        var cached = await _cache.GetAsync<List<Chatbot>>(cacheKey);
        if (cached != null)
            return Ok(cached);


        var results = await _service.GetByOwnerAsync(userEmail, page, pageSize);
        return Ok(results);
    }

    [HttpDelete("delete/{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        var userEmail = GetUserEmail();

        if (userEmail == null) return Unauthorized();

        await _cache.RemoveAsync($"chatbots:{userEmail}:page:1");

        await _service.DeleteAsync(id);
        return Ok(new { message = "Chatbot deleted." });
    }

    [HttpPost("send-message")]
    [Authorize]
    public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
    {
        var userEmail = User.FindFirstValue(ClaimTypes.Email);
        if (userEmail == null) return Unauthorized();


        var bot = await _service.GetByIdAsync(request.ChatbotId);
        if (bot == null || bot.Owner != userEmail)
            return NotFound("Chatbot not found or not owned by user.");


        bot.Messages.Add(new ChatMessage() { Role = "user", Content = request.UserMessage });

        var fullMessages = new List<object>
    {
        new { role = "system", content = bot.Description }
    };
        fullMessages.AddRange(bot.Messages.Select(m => new { role = m.Role, content = m.Content }));

        // Send to Ollama
        var ollamaRequest = new
        {
            model = "llama3",
            messages = fullMessages
        };
 

        var httpClient = new HttpClient();
        var response = await httpClient.PostAsJsonAsync($"{_ollamaUrl}/v1/chat/completions", ollamaRequest);

        if (response != null && !response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "Failed to communicate with Ollama");

        if (response == null)
        {
            throw new Exception("Reponse from Ollama is Null");
        }

        var resultJson = await response.Content?.ReadFromJsonAsync<OllamaChatResponse>();
        var assistantReply = resultJson?.Choices?.FirstOrDefault()?.Message.Content;

        if (string.IsNullOrWhiteSpace(assistantReply))
            return StatusCode(500, "Ollama did not return a valid response");

        bot.Messages.Add(new ChatMessage
        {
            Role = "assistant",
            Content = assistantReply
        });
        await _service.UpdateAsync(bot.Id!, bot);

        return Ok(new
        {
            reply = assistantReply
        });
    }
}
