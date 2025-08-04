using _.Models;
using MongoDB.Driver;

namespace _.Services;

public class ChatbotService
{
    private readonly IMongoCollection<Chatbot> _chatbots;

    public ChatbotService(IConfiguration config)
    {
        var settings = config.GetSection("MongoDbSettings").Get<MongoDbSettings>();
        var client = new MongoClient(settings.ConnectionString);
        var db = client.GetDatabase(settings.DatabaseName);
        _chatbots = db.GetCollection<Chatbot>("Chatbots");
    }

    public async Task CreateAsync(Chatbot bot) => await _chatbots.InsertOneAsync(bot);

    public async Task UpdateAsync(string id, Chatbot updated) =>
        await _chatbots.ReplaceOneAsync(bot => bot.Id == id, updated);

    public async Task<PagedResult<Chatbot>> GetByOwnerAsync(string ownerEmail, int page = 1, int pageSize = 10)  {
        var totalItens = await _chatbots.CountDocumentsAsync(bot => bot.Owner == ownerEmail);

       var query =  await _chatbots.Find(bot => bot.Owner == ownerEmail)
                       .Skip((page - 1) * pageSize)
                       .Limit(pageSize)
                       .ToListAsync();
        return new PagedResult<Chatbot>
        {
            Items = query,
            PageNumber = page,
            PageSize = pageSize,
            TotalCount = totalItens
        };
                       
                    }
    public async Task<Chatbot?> GetByIdAsync(string id) {
        return await _chatbots.Find(bot => bot.Id == id).FirstOrDefaultAsync();
    }

    public async Task DeleteAsync(string id) =>
        await _chatbots.DeleteOneAsync(bot => bot.Id == id);
}
public class PagedResult<T>
{
    public IEnumerable<T> Items { get; set; }
    public long TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}