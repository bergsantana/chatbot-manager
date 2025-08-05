using _.Models;


namespace _.ChatbotManager.Application.Interfaces.Application.Interfaces;
public interface IUserService
{
    Task<User?> GetByEmailAsync(string email);
    Task CreateAsync(User user);
 }