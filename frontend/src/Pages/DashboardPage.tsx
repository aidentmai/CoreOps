import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { GetTeamsAPI } from "../Services/TeamService";
import { GetTeam } from "../Models/Team";
import TaskTable from "../components/TaskTable";
import AddTaskForm from "../components/Dashboard/AddTaskForm";
import { GetTask } from "../Models/Task";
import { GetTaskAPI } from "../Services/TaskService";
import { fetchUnreadMessagesAPI } from "../Services/MessageService";
import { UserAuth } from "../Context/UserAuth";

const DashboardPage = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage team
  const [teams, setTeams] = useState<GetTeam[]>([]);

  // State to manage task
  const [tasks, setTasks] = useState<GetTask[]>([]);

  // State to manage unread messages
  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  const { user } = UserAuth();

  const fetchTasks = async () => {
    try {
      const response = await GetTaskAPI();
      if (response && response.data) {
        setTasks(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await GetTeamsAPI();
        if (response && response.data) {
          setTeams(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch teams");
      }
    };

    const fetchUnreadMessages = async () => {
      if (user?.id) {
        const unreadCount = await fetchUnreadMessagesAPI({ id: user.id });
        if(unreadCount !== undefined) {
          setUnreadMessages(unreadCount);
        }
      }
    }

    fetchTeams();
    fetchTasks();
    fetchUnreadMessages();
  }, []);

  const handleTaskAdded = () => {
    setIsModalOpen(false);
    fetchTasks();
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  return (
    <div className="">
      <Navbar unreadMessages={unreadMessages}/>
      <div className="flex flex-col mx-auto py-8 items-end pr-16">
        <button
          className="bg-navajowhite font-medium rounded-lg text-m px-3 py-3 w-24 text-center me-2 mb-2 border border-gray-300 inline-block"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        >
          Add Task
        </button>

        {/* Modal Toggle */}
        {isModalOpen && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <AddTaskForm
              onClose={() => setIsModalOpen(false)}
              onTaskAdded={handleTaskAdded}
            />
          </div>
        )}
      </div>
      <div className="">
        <TaskTable
          teams={teams}
          tasks={tasks}
          onTaskUpdated={handleTaskUpdated}
          isDashboard={true}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
