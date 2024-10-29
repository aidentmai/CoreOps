import { GetTask } from "../Models/Task";
import { GetTeam } from "../Models/Team";

interface TaskTableProps {
  teams: GetTeam[];
  tasks: GetTask[];
}

const TaskTable: React.FC<TaskTableProps> = ({ teams, tasks }) => {
    // Sort task by createdDate
    const sortedTasks = tasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Priority</th>
            <th>Due</th>
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
              <tr key={task.id || index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{task.title}</td>
                <td>{memberName}</td>
                <td>{task.status}</td>
                <td>50%</td>
                <td>{task.priority}</td>
                <td>{formattedDueDate}</td>
              </tr>
            );
          })}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr></tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TaskTable;
