using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TeamMembership
    {
        // Foreign keys
        public int teamId { get; set; }
        public Team Team { get; set; }
        public string userId { get; set; }
        public User User { get; set; }
    }
}