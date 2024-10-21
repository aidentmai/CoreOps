using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Team
{
    public class AddUserToTeamRequestDTO
    {
        public int teamId { get; set; }
        public string userId { get; set; } = string.Empty;
    }
}