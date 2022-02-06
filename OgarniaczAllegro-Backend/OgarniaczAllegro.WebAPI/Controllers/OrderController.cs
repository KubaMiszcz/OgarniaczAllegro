using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ILogger<OrderController> _logger;

        public OrderController(
            IOrderRepository orderRepository,
            ILogger<OrderController> logger)
        {
            _orderRepository = orderRepository;
            _logger = logger;
        }

        [HttpGet]
        //public IEnumerable<IOrderDTO> Get()
        public IActionResult Get()
        {
            return Ok();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        //public IActionResult Post([FromBody] OrderDTO value)
        public IActionResult Post([FromBody] OrderDTO order)
        {
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return LogAndReturn500(e);
            }
        }

        private StatusCodeResult LogAndReturn500(Exception e)
        {
            _logger.LogError(e.Message, e);
            return StatusCode(StatusCodes.Status500InternalServerError);
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
