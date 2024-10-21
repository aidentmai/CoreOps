using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Task;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDBContext _context;
        public TaskRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Models.Task> CreateAsync(Models.Task taskModel)
        {
            await _context.Tasks.AddAsync(taskModel);
            await _context.SaveChangesAsync();
            return taskModel;
        }

        public async Task<Models.Task?> DeleteAsync(int id)
        {
            var taskModel = await _context.Tasks.FirstOrDefaultAsync(t => t.taskId == id);

            if (taskModel == null)
            {
                return null;
            }

            _context.Tasks.Remove(taskModel);
            await _context.SaveChangesAsync();

            return taskModel;
        }

        public async Task<Models.Task?> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<List<Models.Task>> GetTasksAsync()
        {
            return await _context.Tasks.ToListAsync();  
        }

        public async Task<Models.Task?> UpdateAsync(int id, UpdateTaskRequestDTO taskDTO)
        {
            var existingTask = await _context.Tasks.FirstOrDefaultAsync(t => t.taskId == id);

            if (existingTask == null)
            {
                return null;
            }

            existingTask.title = taskDTO.title;
            existingTask.description = taskDTO.description;
            existingTask.status = taskDTO.status;
            existingTask.priority = taskDTO.priority;
            existingTask.dueDate = taskDTO.dueDate;
            existingTask.updatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return existingTask;
        }
    }
}