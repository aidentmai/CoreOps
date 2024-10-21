using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Controllers
{
    public class TeamMembershipController
    {
        private readonly UserManager<User> _userManager;
        private readonly ITeamRepository _teamRepository;
        public TeamMembershipController(UserManager<User> userManager, ITeamRepository teamRepository)
        {
            _userManager = userManager;
            _teamRepository = teamRepository;
        }
    }
}