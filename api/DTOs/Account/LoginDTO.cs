using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Account
{
    public class LoginDTO
    {
        [Required]
        public string userName { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}