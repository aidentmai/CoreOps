import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { GetTeam } from "../../Models/Team";
import { GetTeamsAPI } from "../../Services/TeamService";
import { AddTaskAPI } from "../../Services/TaskService";
import { UserAuth } from "../../Context/UserAuth";


interface AddTaskFormProps {
  onClose: () => void;
  onTaskAdded: () => void;
}

const AddTaskForm = ({ onClose, onTaskAdded }: AddTaskFormProps) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status] = useState("Open");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [teams, setTeams] = useState<GetTeam[]>([]);
  const [teamMembers, setTeamMembers] = useState<{ userId: string; userName: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { user } = UserAuth();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await GetTeamsAPI();
        if (response && response.data) { // Check if response and response.data exist
          setTeams(response.data);
          const members = response.data.flatMap((team: GetTeam) => team.teamMembers);
          const filteredMembers = members.filter((member) => member.userId !== user?.id);
          setTeamMembers(filteredMembers);
        }
      } catch (error) {
        toast.error("Failed to fetch teams");
      }
    };

    fetchTeams();
  }, []);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Initialize teamId and userId
    let teamId: number = 0;
    let userId: string = "";

    // Grab teamId and userId
    teams.map((team) => {
      teamId = team.teamId;
      team.teamMembers.map((member) => {
        if(member.userId === selectedUserId) {
          userId = member.userId;
        }
      })
    })

    try {
      await AddTaskAPI(
        taskName,
        taskDescription,
        status,
        priority,
        dueDate,
        teamId,
        userId
      );
      toast.success("Task added successfully");
      onTaskAdded();
      onClose();
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  return (
      <div
            id="crud-modal"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Create New Task
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={() => onClose()} // Close modal
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <form className="p-4" onSubmit={handleAddTask}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="taskName"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Task Name
                      </label>
                      <input
                        type="text"
                        name="taskName"
                        id="taskName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Type task name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="taskDescription"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Task Description
                      </label>
                      <textarea
                        id="taskDescription"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write task description here"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label
                        htmlFor="priority"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="dueDate"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Due Date
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="teamMember"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Assign To
                      </label>
                      <select
                        id="teamMember"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        required
                      >
                        <option value="">Select team member</option>
                        {teamMembers.map((member) => (
                          <option key={member.userId} value={member.userId}>
                            {member.userName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      />
                    </svg>
                    Add Task
                  </button>
                </form>
              </div>
            </div>
          </div>
  );
};

export default AddTaskForm;