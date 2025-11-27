using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using System.Net.Http.Headers;
using System.Text;
using UpsOAuthDemo.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();
builder.Services.AddScoped<UpsTokenService>();
builder.Services.AddHttpContextAccessor();

var upsConfig = builder.Configuration.GetSection("UPS");

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = "UPS";
    })
    .AddCookie(options =>
    {
        options.LoginPath = "/account/login";
        options.AccessDeniedPath = "/account/accessdenied";
        // Allow HTTP for localhost testing
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
        options.Cookie.SameSite = SameSiteMode.Lax;
    })
    .AddOAuth("UPS", options =>
    {
        options.ClientId = upsConfig["ClientId"]!;
        options.ClientSecret = upsConfig["ClientSecret"]!;
        options.AuthorizationEndpoint = upsConfig["AuthorizationEndpoint"]!;
        options.TokenEndpoint = upsConfig["TokenEndpoint"]!;
        options.CallbackPath = new PathString(upsConfig["CallbackPath"]);
        
        options.Scope.Clear();
        options.Scope.Add("read");
        options.SaveTokens = true;

       // --- CRITICAL FIX: Force Auth Header for UPS ---
        // initializing the HTTP Client first!
        options.Backchannel = new HttpClient(); 

        var authString = $"{options.ClientId}:{options.ClientSecret}";
        var base64Auth = Convert.ToBase64String(Encoding.UTF8.GetBytes(authString));
        options.Backchannel.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Basic", base64Auth);

        options.Events = new OAuthEvents
        {
            OnCreatingTicket = async context =>
            {
                if (!string.IsNullOrEmpty(context.AccessToken))
                    context.Identity?.AddClaim(new System.Security.Claims.Claim("urn:tokens:access_token", context.AccessToken));
                if (!string.IsNullOrEmpty(context.RefreshToken))
                    context.Identity?.AddClaim(new System.Security.Claims.Claim("urn:tokens:refresh_token", context.RefreshToken));
                if (context.ExpiresIn.HasValue)
                    context.Identity?.AddClaim(new System.Security.Claims.Claim("urn:tokens:expires_at", DateTimeOffset.UtcNow.Add(context.ExpiresIn.Value).ToString("o")));
                
                await Task.CompletedTask;
            },
            OnRemoteFailure = context =>
            {
                var safeMessage = System.Net.WebUtility.UrlEncode(context.Failure?.Message ?? "Unknown Error");
                context.Response.Redirect($"/Home/Error?message={safeMessage}");
                context.HandleResponse();
                return Task.CompletedTask;
            }
        };
    });

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();