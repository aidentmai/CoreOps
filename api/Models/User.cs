using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class User : IdentityUser
    {
        //Navigation properties
        public List<Task> Tasks{ get; set; } = new List<Task>();
        public List<TeamMembership> Teams { get; set; } = new List<TeamMembership>();
    }
}