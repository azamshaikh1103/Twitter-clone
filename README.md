# UPS OAuth 2.0 Integration

## OVERVIEW

This solution implements a secure, production-ready OAuth 2.0 flow for UPS.
It utilizes ASP.NET Core's native Authentication Middleware for maximum security and performance.

## KEY FEATURES

1. **Secure Token Storage**: Access and Refresh tokens are encrypted within the User Session (Cookies).
2. **Auto-Refresh Logic**: The 'UpsTokenService' automatically detects expiring tokens and refreshes them before API calls fail.
3. **Professional UI**: A clean, responsive dashboard to view connection status.

## SETUP INSTRUCTIONS

1. Open 'appsettings.json'.
2. Verify your 'ClientId' and 'ClientSecret' are correct.
3. IMPORTANT: Go to your UPS Developer Portal (developer.ups.com).
   - Edit your App.
   - Add this EXACT URL to the 'Callback URL' list:
     https://localhost:7004/signin-ups
   - Save changes.

## HOW TO RUN

1. Open the project in Visual Studio or Terminal.
2. Run 'dotnet run'.
3. Open 'https://localhost:7004'.
4. Click "Connect UPS Account".

## INTEGRATION GUIDE

To use the UPS API in other controllers:

1. Inject the service:
   public class MyController : Controller {
   private readonly UpsTokenService \_upsService;
   public MyController(UpsTokenService upsService) { \_upsService = upsService; }
   }

2. Call the API:
   // This method automatically handles token refresh if needed
   var token = await \_upsService.EnsureValidAccessToken(HttpContext);
   // Use 'token' in your HTTP headers.
