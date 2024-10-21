using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Team
{
    public class TeamMemberDTO
    {
        public string userId { get; set; }
        public string userName { get; set; } = string.Empty;
        
    }
}