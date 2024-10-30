import { useState } from "react";
import { GetTask } from "../Models/Task";
import { GetTeam } from "../Models/Team";
import UpdateTaskForm from "./UpdateTaskForm";

interface TaskTableProps {
  teams: GetTeam[];
  tasks: GetTask[];
  onTaskUpdated: () => void;
  isDashboard?: boolean;
}

const TaskTable: React.FC<TaskTableProps> = ({
  teams,
  tasks,
  onTaskUpdated,
  isDashboard = false
}) => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<GetTask | null>(null);

  // Sort task by createdDate
  const sortedTasks = tasks.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const openModal = (task: GetTask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
    onTaskUpdated();
  };

  return (
    <div className="overflow-y-hidden">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="pl-16 pr-60">Task</th>
            {isDashboard && <th className="pl-12">Assigned To</th>}
            <th className="pl-12">Status</th>
            <th className="pl-12">Progress</th>
            <th className="pl-12">Priority</th>
            <th className="pl-12">Due</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task, index) => {
            const memberName =
              teams
                .flatMap((team) => team.teamMembers)
                .find((member) => member.userId === task.userId)?.userName ||
              "Unknown User";

            // Format due date to show only month and day
            const formattedDueDate = new Date(task.dueDate).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
              }
            );

            return (
              <tr key={task.taskId || index}>
                <td
                  className={`${
                    task.status === "Completed"
                      ? "pl-16 line-through text-gray-500"
                      : "pl-16"
                  }`}
                >
                  {task.title}
                </td>
                {isDashboard && <td className="pl-12">{memberName}</td>}
                <td className="pl-12">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      task.status === "Open"
                        ? "bg-yellow-200"
                        : task.status === "In Progress"
                        ? "bg-blue-200"
                        : task.status === "Completed"
                        ? "bg-green-200"
                        : ""
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="pl-12">
                  <div
                    className="radial-progress"
                    style={
                      {
                        "--value":
                          task.status === "Open"
                            ? 0
                            : task.status === "In Progress"
                            ? 50
                            : task.status === "Completed"
                            ? 100
                            : 0,
                      } as React.CSSProperties
                    }
                    role="progressbar"
                  >
                    {task.status === "Open"
                      ? 0
                      : task.status === "In Progress"
                      ? 50
                      : task.status === "Completed"
                      ? 100
                      : 0}
                    %
                  </div>
                </td>
                <td className="pl-12">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      task.priority === "Low"
                        ? "bg-green-200"
                        : task.priority === "Medium"
                        ? "bg-yellow-200"
                        : task.priority === "High"
                        ? "bg-red-200"
                        : ""
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="pl-12">{formattedDueDate}</td>
                <td>
                  <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => openModal(task)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr></tr>
        </tfoot>
      </table>

      {isModalOpen && selectedTask ? (
        <UpdateTaskForm
          id={selectedTask.taskId}
          selectedTask={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onTaskUpdated={closeModal}
        />
      ) : null}
    </div>
  );
};

export default TaskTable;
