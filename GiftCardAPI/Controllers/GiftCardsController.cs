using Microsoft.AspNetCore.Mvc;

namespace GiftCardAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GiftCardsController : ControllerBase
    {
        private readonly ILogger<GiftCardsController> _logger;

        public GiftCardsController(ILogger<GiftCardsController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "")]
        public async Task<IActionResult> Get()
        {
            return Ok();
        }

        [HttpPost(Name = "")]
        public async Task<IActionResult> CreateGiftCard()
        {
            return Created("GiftCard",null);
        }

        [HttpPut(Name = "")]
        public async Task<IActionResult> Redeem()
        {
            return Created("GiftCard", null);
        }

    }
}