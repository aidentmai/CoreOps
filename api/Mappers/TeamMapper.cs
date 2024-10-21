using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Team;
using api.Models;

namespace api.Mappers
{
    public static class TeamMapper
    {
        public static TeamDTO ToTeamDTO(this Team teamModel)
        {
            return new TeamDTO
            {
                teamId = teamModel.teamId,
                teamName = teamModel.teamName,
                TeamMembers = teamModel.TeamMembers.Select(tm => new TeamMemberDTO
                {
                    userId = tm.userId,
                    userName = tm.User?.UserName // Assuming User has a UserName property
                }).ToList()
            };
        }

        public static Team ToTeamFromCreateDTO(this CreateTeamRequestDTO teamDTO)
        {
            return new Team
            {
                teamName = teamDTO.teamName
            };
        }
    }
}