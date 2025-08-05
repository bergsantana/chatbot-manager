using _.Models;

public interface IChatbotService
{
    Task<Chatbot?> GetByIdAsync(string id);
    Task<PagedResult<Chatbot>> GetByOwnerAsync(string owner, int page, int pageSize);
    Task CreateAsync(Chatbot chatbot);
    Task UpdateAsync(string id, Chatbot updated);
    Task DeleteAsync(string id);
}

public class PagedResult<T>
{
    required public IEnumerable<T> Items { get; set; }
    public long TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}