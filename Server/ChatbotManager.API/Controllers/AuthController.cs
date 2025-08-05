using _.Models;
using _.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace _.Controllers;


[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;
    private readonly IConfiguration _config;

    public AuthController(UserService userService, IConfiguration config)
    {
        _userService = userService;
        _config = config;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] User user)
    {
        var existing = await _userService.GetByEmailAsync(user.Email);
        if (existing != null) return BadRequest("Email already exists.");

        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        await _userService.CreateAsync(user);
        return Ok(new { message = "User created." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User login)
    {
        var user = await _userService.GetByEmailAsync(login.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
            return Unauthorized();

        var token = GenerateJwtToken(user);
        return Ok(new { token, user });
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult Me()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        var email = identity?.FindFirst(ClaimTypes.Email)?.Value;
        var name = identity?.FindFirst(ClaimTypes.Name)?.Value;
        return Ok(new { name, email });
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(3),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}