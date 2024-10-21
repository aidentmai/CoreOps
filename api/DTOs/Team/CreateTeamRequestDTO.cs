using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Team
{
    public class CreateTeamRequestDTO
    {
        [Required]
        [MinLength(4, ErrorMessage = "Team name must be at least 4 characters long")]
        [MaxLength(50, ErrorMessage = "Team name must be less than 50 characters long")]
        public string teamName { get; set; }
    }
}