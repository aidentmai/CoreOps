import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { GetTeamsAPI } from "../Services/TeamService";
import { GetTeam } from "../Models/Team";
import TaskTable from "../components/TaskTable";
import AddTaskForm from "../components/TaskForm";
import { GetTask } from "../Models/Task";
import { GetTaskAPI } from "../Services/TaskService";

const DashboardPage = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage team
  const [teams, setTeams] = useState<GetTeam[]>([]);

  // State to manage task
  const [tasks, setTasks] = useState<GetTask[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await GetTaskAPI();
      if (response && response.data) {
        setTasks(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  }

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

    fetchTeams();
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    setIsModalOpen(false);
    fetchTasks();
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col max-w-[1200px] mx-auto py-8 items-center">
        <button
          className="font-medium rounded-lg text-m px-3 py-3 w-24 text-center me-2 mb-2 border border-gray-300 inline-block"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        >
          Add Task
        </button>

        {/* Modal Toggle */}
        {isModalOpen && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <AddTaskForm onClose={() => setIsModalOpen(false)} onTaskAdded={handleTaskAdded} />
          </div>
        )}
      </div>
      <TaskTable teams={teams} tasks={tasks}/>
    </div>
  );
};

export default DashboardPage;