using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Task;

namespace api.Mappers
{
    public static class TaskMapper
    {
        public static TaskDTO ToTaskDTO(this Models.Task taskModel)
        {
            return new TaskDTO
            {
                taskId = taskModel.taskId,
                title = taskModel.title,
                description = taskModel.description,
                status = taskModel.status,
                priority = taskModel.priority,
                dueDate = taskModel.dueDate,
                createdAt = taskModel.createdAt,
                updatedAt = taskModel.updatedAt,
                userId = taskModel.userId,
                teamId = taskModel.teamId
            };
        }

        public static Models.Task ToTaskFromCreateDTO(this CreateTaskRequestDTO taskDTO)
        {
            return new Models.Task
            {
                title = taskDTO.title,
                description = taskDTO.description,
                status = taskDTO.status,
                priority = taskDTO.priority,
                dueDate = taskDTO.dueDate,
                createdAt = taskDTO.createdAt,
                updatedAt = taskDTO.updatedAt,
                userId = taskDTO.userId,
                teamId = taskDTO.teamId
            };
        }
    }
}