using GiftCardAPI.Models;
using GiftCardAPI.RedisDocument;
using Microsoft.AspNetCore.Mvc;
using Redis.OM;
using Redis.OM.Searching;

namespace GiftCardAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GiftCardsController : ControllerBase
    {
        private readonly ILogger<GiftCardsController> _logger;
        private readonly IConfiguration _configuration;
        private readonly RedisConnectionProvider _provider;

        public GiftCardsController(ILogger<GiftCardsController> logger, IConfiguration configuration, RedisConnectionProvider provider)
        {
            _logger = logger;
            _configuration = configuration;
            _provider = provider;

        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GiftCardQuery giftCardQuery)
        {
            var giftCardCollection = _provider.RedisCollection<GiftCard>();
           
            if (giftCardQuery.Active.HasValue)
            {
                giftCardCollection = giftCardCollection.Where(x => x.ExpireOn > DateTime.UtcNow);
            }

            if (giftCardQuery.Value.HasValue)
            {
                giftCardCollection = giftCardCollection.Where(x => x.Value == giftCardQuery.Value.Value);
            }

            if (!string.IsNullOrEmpty(giftCardQuery.Code))
            {
                giftCardCollection = giftCardCollection.Where(x => x.Code == giftCardQuery.Code);
            }

            IList<GiftCard> giftCards = await giftCardCollection.ToListAsync();
            return Ok(giftCards);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGiftCard([FromBody] CreateGiftCardRequest createGiftCardRequest)
        {
            var giftCard = new GiftCard();
            giftCard.Value = createGiftCardRequest.GiftCardValue;
            giftCard.Code = Guid.NewGuid().ToString();
            giftCard.CreatedOn = DateTime.UtcNow;
            giftCard.ExpireOn = giftCard.CreatedOn.AddYears(1);
            giftCard.IsConsumed = false;

            var giftCardCollection = _provider.RedisCollection<GiftCard>();
            await giftCardCollection.InsertAsync(giftCard);
            return Created("GiftCard", giftCard.Id);
        }

        [HttpPut("/redeem")]
        public async Task<IActionResult> Redeem([FromBody] RedeemGiftCardRequest redeemGiftCardRequest)
        {
            if(string.IsNullOrEmpty(redeemGiftCardRequest.GiftCardCode))
            {
                return BadRequest();
            }

            var giftCardCollection = _provider.RedisCollection<GiftCard>();
            var validGiftCard = await giftCardCollection.Where(x => x.Code == redeemGiftCardRequest.GiftCardCode).SingleOrDefaultAsync();
            if(validGiftCard == null || validGiftCard.IsConsumed || validGiftCard.ExpireOn < DateTime.UtcNow)
            {
                return BadRequest();
            }

            validGiftCard.IsConsumed = true;
            _provider.Connection.Set(validGiftCard);
            return Accepted();
        }

        [HttpPost("/InitializeStorage")]
        public async Task<IActionResult> InitializeStorage()
        {
            var provider = new RedisConnectionProvider(_configuration["REDIS_CONNECTION_STRING"]);
            var isSuccess = await provider.Connection.CreateIndexAsync(typeof(GiftCard));
            return Created("Storage", null);
        }
    }
}