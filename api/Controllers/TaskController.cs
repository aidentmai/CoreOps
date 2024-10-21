using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Task;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ITaskRepository _taskRepository;
        public TaskController(ApplicationDBContext context, UserManager<User> userManager, ITaskRepository taskRepository)
        {
            _context = context;
            _userManager = userManager;
            _taskRepository = taskRepository;
        }
    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var tasks = await _taskRepository.GetTasksAsync();
        
        var taskDto = tasks.Select(t => t.ToTaskDTO());
        
        return Ok(tasks);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var task = await _taskRepository.GetTaskByIdAsync(id);
        
        if (task == null)
        {
            return NotFound();
        }

        return Ok(task.ToTaskDTO());
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskRequestDTO taskDTO)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var taskModel = taskDTO.ToTaskFromCreateDTO();

        // Get user id
        var userId = _userManager.GetUserId(User);
        taskDTO.userId = userId;

        taskModel.teamId = taskDTO.teamId;

        // Validate teamId
        var teamExists = _context.Teams.Any(t => t.teamId == taskModel.teamId);
        if (!teamExists)
        {
            return BadRequest("Invalid teamId");
        }
        
        await _taskRepository.CreateAsync(taskModel);

        return CreatedAtAction(nameof(GetById), new { id = taskModel.taskId }, taskModel);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateTask([FromRoute] int id, [FromBody] UpdateTaskRequestDTO updateDTO)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var taskModel = await _taskRepository.UpdateAsync(id, updateDTO);

        if(taskModel == null)
        {
            return NotFound();
        }

        return Ok(taskModel.ToTaskDTO());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTask([FromRoute] int id)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);
            
        var taskModel = await _taskRepository.DeleteAsync(id);

        if(taskModel == null)
        {
            return NotFound();
        }

        return NoContent();
    }
}
}