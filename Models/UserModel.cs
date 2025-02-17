using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Winter_Project.Models
{
    public class UserModel
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public string Username {get; set;} = string.Empty;
        public string Email {get; set;} = string.Empty;

    }

}