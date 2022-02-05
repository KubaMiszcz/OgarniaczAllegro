using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OgarniaczAllegro.DAL;
using OgarniaczAllegro.DAL.Models;
using OgarniaczAllegro.WebAPI.DTO;
using OgarniaczAllegro.WebAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OgarniaczAllegro.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatusController : ControllerBase
    {
        private readonly IStatusRepository _statusService;
        private readonly ILogger<OrderController> _logger;

        public StatusController(
            IStatusRepository statusService,
            ILogger<OrderController> logger)
        {
            _statusService = statusService;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        //public ActionResult<List<StatusDTO>> Get()
        {
            //try
            //{
                var res = _statusService.GetStatuses();
                return Ok(res);
            //}
            //catch (Exception e)
            //{
            //    _logger.LogError(e.Message, e);
            //    return StatusCode(StatusCodes.Status500InternalServerError);
            //}
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
