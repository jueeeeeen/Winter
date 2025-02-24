using System.Diagnostics;
namespace Winter_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Winter_Project.Models; 
using Microsoft.EntityFrameworkCore;

public class ChatController: Controller
{
    public IActionResult Index()
    {
        return View();
    }
}