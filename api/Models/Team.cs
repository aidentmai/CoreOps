using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Team
    {
        public int teamId { get; set; }
        public string teamName { get; set; } = string.Empty;

        // Navigation properties
        public List<TeamMembership> TeamMembers { get; set; } = new List<TeamMembership>();
        public List<Task> Tasks { get; set; } = new List<Task>();
    }
}