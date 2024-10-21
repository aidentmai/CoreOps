using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTOs.Team
{
    public class TeamDTO
    {
        public int teamId { get; set; }
        public string teamName { get; set; } = string.Empty;
        public List<TeamMemberDTO> TeamMembers { get; set; } = new List<TeamMemberDTO>();
    }
}