using Winter_Project.ViewModels;
using Winter_Project.Models; 
using System.Linq;

namespace Winter_Project.Services {
    public class UserService
    {
        private readonly WinterContext _context;

        public UserService(WinterContext context)
        {
            _context = context;
        }

        public NavbarProfileViewModel? GetNavbarProfile(string username)
        {
            return _context.Users
                .Where(u => u.Username == username)
                .Select(u => new NavbarProfileViewModel
                {
                    Username = u.Username,
                    FirstName = u.FirstName,
                    LastName = u.LastName
                })
                .FirstOrDefault();
        }
    }
}

