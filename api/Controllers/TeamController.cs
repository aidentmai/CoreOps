using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Team;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITeamRepository _teamRepository;
        public TeamController(ApplicationDBContext context, ITeamRepository teamRepository)
        {
            _context = context;
            _teamRepository = teamRepository;
        }

    [HttpGet]
    public async Task<IActionResult> GetTeams()
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var teams = await _teamRepository.GetTeamsAsync();

        var teamDto = teams.Select(t => t.ToTeamDTO());

        return Ok(teamDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetTeamById(int id)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var team = await _teamRepository.GetTeamByIdAsync(id);

        if(team == null)
        {
            return NotFound();
        }

        return Ok(team.ToTeamDTO());
    }

    [HttpPost]
    public IActionResult CreateTeam([FromBody] CreateTeamRequestDTO teamDTO)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var teamModel = teamDTO.ToTeamFromCreateDTO();
        _context.Teams.Add(teamModel);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetTeamById), new { id = teamModel.teamId }, teamModel);
    }

    [HttpPost("{teamId:int}/members")]
    public async Task<IActionResult> AddUserToTeam(int teamId, [FromBody] AddUserToTeamRequestDTO addUserToTeamRequestDTO)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);
        
        // Check if team exists
        var team = await _teamRepository.GetTeamByIdAsync(addUserToTeamRequestDTO.teamId);
        if(team == null)
        {
            return NotFound("Team not found");
        }

        // Check if user exists
        var user = await _context.Users.FindAsync(addUserToTeamRequestDTO.userId);
        if(user == null)
        {
            return NotFound("User not found");
        }

        // Check if user is already in team
        var userInTeam = team.TeamMembers.FirstOrDefault(u => u.userId == addUserToTeamRequestDTO.userId);
        if(userInTeam != null)
        {
            return BadRequest("User is already in team");
        }

        // Create a new team membership
        var teamMembership = new TeamMembership
        {
            teamId = addUserToTeamRequestDTO.teamId,
            userId = addUserToTeamRequestDTO.userId
        };

        // Add team membership to team
        team.TeamMembers.Add(teamMembership);
        await _context.SaveChangesAsync();

        return Ok("User added to team");

    }

    }
}