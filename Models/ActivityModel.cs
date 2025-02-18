using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Winter_Project.Models
{
    public class ActivityModel
    {
        public int Id {get; set;}
        public string Owner {get; set;} = string.Empty;
        public string Title {get; set;} = string.Empty;
        public string Detai {get; set;} = string.Empty;
        public string Creat_time {get; set;} = string.Empty;
        public string Activity_time {get; set;} = string.Empty;
        public string Durartion {get; set;} = string.Empty;
        public string Location {get; set;} = string.Empty;
        public int Max_member {get; set;}
        public bool approval {get; set;}
        public string tags {get; set;} = string.Empty;
    }
}