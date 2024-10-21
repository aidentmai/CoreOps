using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Task;

namespace api.Interfaces
{
    public interface ITaskRepository
    {
        Task<List<Models.Task>> GetTasksAsync();
        Task<Models.Task?> GetTaskByIdAsync(int id);
        Task<Models.Task> CreateAsync(Models.Task taskModel);
        Task<Models.Task?> UpdateAsync(int id, UpdateTaskRequestDTO taskDTO);
        Task<Models.Task?> DeleteAsync(int id);
    }
}