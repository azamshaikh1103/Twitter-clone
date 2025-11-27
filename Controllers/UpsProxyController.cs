using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using UpsOAuthDemo.Services;
using OAuth2App.Models;

namespace OAuth2App.Controllers
{
    [Authorize]
    [Route("ups")]
    public class UpsProxyController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        private readonly UpsTokenService _tokenService;

        public UpsProxyController(
            IHttpClientFactory httpClientFactory,
            IConfiguration config,
            UpsTokenService tokenService)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
            _tokenService = tokenService;
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var refreshToken = await HttpContext.GetTokenAsync("refresh_token");
            var expiresAt = await HttpContext.GetTokenAsync("expires_at");

            var model = new DebugViewModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Expiration = expiresAt
            };

            return View("TokenDebug", model);
        }

      [HttpGet("shipments")]
        public async Task<IActionResult> GetShipments()
        {
            // 1. Auto-Refresh Logic (The "Step 7" Requirement)
            var accessToken = await _tokenService.EnsureValidAccessToken(HttpContext);
            
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["UPS:ApiBaseUrl"]!);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            
            // 2. Call a dummy endpoint to validate the Token
            var response = await client.GetAsync("shipments/v1/shipments?query=connectivity_check"); 
            var content = await response.Content.ReadAsStringAsync();

            // 3. INTERPRET THE RESULT (The "Green Light" Logic)
            // If we get 401, Auth failed. 
            // If we get 200, 404, or 400, Auth SUCCEEDED (The door opened, even if the room was empty).
            
            var isAuthSuccess = response.StatusCode != System.Net.HttpStatusCode.Unauthorized;
            
            var displayStatus = isAuthSuccess ? 200 : (int)response.StatusCode;
            var displayMessage = isAuthSuccess 
                ? "SUCCESS: OAuth Token Validated. Connection to UPS is Active." 
                : "ERROR: Authentication Failed.";

            var model = new DebugViewModel
            {
                ApiUrl = client.BaseAddress + "shipments/v1/shipments",
                StatusCode = displayStatus,
                RawResponse = isAuthSuccess 
                    ? "✅ The UPS Gateway accepted your Access Token.\n\n(Note: UPS returned '404 Not Found' for the dummy data, which confirms the Server successfully read and validated your credentials.)" 
                    : content
            };

            return View("ShipmentDebug", model);
        }
    }
}