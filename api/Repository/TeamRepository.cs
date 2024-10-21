using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class TeamRepository : ITeamRepository
    {
        private readonly ApplicationDBContext _context;
        public TeamRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Team?> GetTeamByIdAsync(int teamId)
        {
            return await _context.Teams.Include(t => t.TeamMembers).FirstOrDefaultAsync(t => t.teamId == teamId);
        }

        public async Task<List<Team>> GetTeamsAsync()
        {
            return await _context.Teams
            .Include(t => t.TeamMembers)
            .ThenInclude(tm => tm.User)
            .ToListAsync();
        }
    }
}