using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Winter_Project.Models;
using Winter_Project.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers(); 
builder.Services.AddScoped<UserService>();
// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddSingleton<WebSocketHandler>();

var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!); 

// ไว้ set ให้ วันที่เป็นภาษาอังกฤษ
var cultureInfo = new System.Globalization.CultureInfo("en-US");
System.Globalization.CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
System.Globalization.CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

// Configure JWT Bearer Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true, // Set to true if you want to validate the issuer
            ValidateAudience = true, // Set to true if you want to validate the audience
            ValidateLifetime = true,
            ValidIssuer = jwtSettings["Issuer"], // กำหนดค่า Issuer จากการตั้งค่า
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ClockSkew = TimeSpan.Zero // Optional: prevents delay between token generation and validation
        };
    });

// Add DbContext for WinterContext
builder.Services.AddDbContext<WinterContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("https://yourfrontend.com") // เปลี่ยนเป็นโดเมนของคุณ
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseStaticFiles(); // Serves static files from wwwroot

app.UseHttpsRedirection();
app.UseRouting();

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

//Enable WebSockets
app.UseWebSockets();
app.Map("/chat/OnConnected", async context =>
{
    var token = context.Request.Cookies["token"];

    // 🔹 Get activity_id from query parameters
    if (!context.Request.Query.ContainsKey("activity_id") || !int.TryParse(context.Request.Query["activity_id"], out int activity_id) || string.IsNullOrEmpty(token))
    {
        context.Response.StatusCode = 400; // Bad Request
        await context.Response.WriteAsync("Missing or invalid activity_id");
        return;
    }

    var username = JwtHelper.DecodeJwt(token);
    var webSocketHandler = context.RequestServices.GetRequiredService<WebSocketHandler>();
    var webSocket = await context.WebSockets.AcceptWebSocketAsync();

    await webSocketHandler.HandleConnectionAsync(webSocket, activity_id, username);
});

// Map controller routes for MVC
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();