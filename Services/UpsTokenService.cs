using System.Text;
using System.Text.Json;
using System.Net.Http.Headers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace UpsOAuthDemo.Services;

public class UpsTokenService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;
    private readonly ILogger<UpsTokenService> _logger;

    public UpsTokenService(
        IHttpClientFactory httpClientFactory,
        IConfiguration config,
        ILogger<UpsTokenService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _config = config;
        _logger = logger;
    }

    public async Task<(string accessToken, string refreshToken, DateTimeOffset expiresAt)>
        RefreshAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        var client = _httpClientFactory.CreateClient();

        var tokenEndpoint = _config["UPS:TokenEndpoint"]
            ?? throw new InvalidOperationException("UPS:TokenEndpoint missing");

        var clientId = _config["UPS:ClientId"];
        var clientSecret = _config["UPS:ClientSecret"];

        // --- CRITICAL FIX: Using Auth Header for Refresh ---
        var authString = $"{clientId}:{clientSecret}";
        var base64Auth = Convert.ToBase64String(Encoding.UTF8.GetBytes(authString));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64Auth);

        var body = new Dictionary<string, string>
        {
            ["grant_type"] = "refresh_token",
            ["refresh_token"] = refreshToken
        };

        var response = await client.PostAsync(
            tokenEndpoint,
            new FormUrlEncodedContent(body),
            cancellationToken);

        // If this fails, it will throw the exception.
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync(cancellationToken);
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        var accessToken = root.GetProperty("access_token").GetString()!;
        var newRefreshToken = root.TryGetProperty("refresh_token", out var rt)
            ? rt.GetString() ?? refreshToken
            : refreshToken;

        var expiresInSeconds = root.TryGetProperty("expires_in", out var ei)
            ? ei.GetInt32()
            : 3600;

        var expiresAt = DateTimeOffset.UtcNow.AddSeconds(expiresInSeconds);

        _logger.LogInformation("Refreshed UPS access token, expires at {ExpiresAt}", expiresAt);

        return (accessToken, newRefreshToken, expiresAt);
    }

    /// <summary>
    /// Ensures we have a valid access token for current user; refreshes if close to expiry.
    /// </summary>
    public async Task<string?> EnsureValidAccessToken(HttpContext context)
    {
        var authenticateResult = await context.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        if (!authenticateResult.Succeeded)
            return null;

        var props = authenticateResult.Properties;

        var accessToken = await context.GetTokenAsync("access_token");
        var refreshToken = await context.GetTokenAsync("refresh_token");
        var expiresAtStr = await context.GetTokenAsync("expires_at");

        if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(refreshToken))
            return null;

        if (!DateTimeOffset.TryParse(expiresAtStr, out var expiresAt))
        {
            // if missing/invalid, just refresh
            var refreshed = await RefreshAsync(refreshToken);
            UpdateTokens(props, refreshed);
            await ResignInAsync(context, authenticateResult.Principal!, props);
            return refreshed.accessToken;
        }

        // Force refresh if expired (or close to it)
        if (expiresAt < DateTimeOffset.UtcNow.AddMinutes(1))
        {
            var refreshed = await RefreshAsync(refreshToken);
            UpdateTokens(props, refreshed);
            await ResignInAsync(context, authenticateResult.Principal!, props);
            return refreshed.accessToken;
        }

        return accessToken;
    }

    private static void UpdateTokens(
        AuthenticationProperties props,
        (string accessToken, string refreshToken, DateTimeOffset expiresAt) t)
    {
        props.UpdateTokenValue("access_token", t.accessToken);
        props.UpdateTokenValue("refresh_token", t.refreshToken);
        props.UpdateTokenValue("expires_at", t.expiresAt.ToString("o"));
    }

    private static Task ResignInAsync(
        HttpContext context,
        System.Security.Claims.ClaimsPrincipal principal,
        AuthenticationProperties props) =>
        context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, props);
}