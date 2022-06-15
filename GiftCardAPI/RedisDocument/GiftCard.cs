using Redis.OM.Modeling;

namespace GiftCardAPI.RedisDocument
{
    [Document]
    public partial class GiftCard
    {
        [RedisIdField] 
        public string Id { get; set; }
        [Indexed(Sortable = true)]
        public string Code { get; set; }

        [Searchable(Sortable = true)]
        public double Value { get; set; }

        [Indexed(Sortable = true)]
        public DateTime CreatedOn { get; set; }

        [Indexed(Sortable = true)]
        public DateTime ExpireOn { get; set; }

        [Searchable(Sortable = true)]
        public bool IsConsumed { get; set; }
    }
}
