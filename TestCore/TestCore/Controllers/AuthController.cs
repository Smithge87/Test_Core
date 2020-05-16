using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestCore.Data;
using TestCore.Models;

namespace TestCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(string username, string password)
        {
            // validate request
            username = username.ToLower();
            if (await _repo.UserExists(username))
            {
                return BadRequest("Username already axists");
            }
            var userToCreate = new User
            {
                Username = username
            };
            var createdUser = await _repo.Register(userToCreate, password);

            return StatusCode(201);
        }

    }
}