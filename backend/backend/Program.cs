using backend.DataAccess.DataAccess.DbPatterns;
using backend.DataAccess.DataAccess.DbPatterns.Interfaces;
using backend.WebNavigator.Services.Interface;
using backend.WebNavigator.Services.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using DBContext = backend.DataAccess.DataAccess.DBContext;

var builder = WebApplication.CreateBuilder(args);

string connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DBContext>(options => options.UseSqlServer(connection));

// Add services to the container.
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<IEntryService, EntryService>();
builder.Services.AddTransient<INodeService, NodeService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder => builder.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();
app.UseRouting();

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Navigator}/{action=Index}");

app.Run();
