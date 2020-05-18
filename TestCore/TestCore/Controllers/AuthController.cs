using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestCore.Data;
using TestCore.Dtos;
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
        //-- registers UserForRegister using the dto info, functionality stays uncoupled. 
        //-- UserForRegister DTO is pretty awesome. reads the JSON object off the page when register is called POST for the API and infers the values for UserForRegister function 
        //-- reads from the Body object - adding [From Body] prevents nulls from validation
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //-- don't need this because im working in an API controller (see top of file) and dto level validation
            if (!ModelState.IsValid)
            {
                //-- prevents 500 error, 
                return BadRequest(ModelState);
            }
            // validate request
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Username already axists");
            }
            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };
            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

    }
}