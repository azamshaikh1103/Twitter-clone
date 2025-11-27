namespace OAuth2App.Models
{
    public class DebugViewModel
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public string? Expiration { get; set; }
        public int StatusCode { get; set; }
        public string? ApiUrl { get; set; }
        public string? RawResponse { get; set; }
    }
}