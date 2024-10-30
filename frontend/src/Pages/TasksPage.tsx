import { SyntheticEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { GetTask } from "../Models/Task";
import { GetTaskAPI } from "../Services/TaskService";
import { toast } from "react-toastify";
import { GetTeam } from "../Models/Team";
import SearchBar from "../components/SearchBar";
import TaskTable from "../components/TaskTable";
import { UserAuth } from "../Context/UserAuth";

const TasksPage = () => {
  const [tasks, setTasks] = useState<GetTask[]>([]);
  const [userTasks, setUserTasks] = useState<GetTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<GetTask[]>([]);
  const [teams] = useState<GetTeam[]>([]);
  const [searchTask, setSearchTask] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GetTask[]>([]);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
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

  const filterTasksByUserId = () => {
    const userTasks = tasks.filter((task) => task.userId === user?.id);
    setUserTasks(userTasks);
    setFilteredTasks(userTasks);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTasks();
      filterTasksByUserId();
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterTasksByUserId();
  }, [tasks]);

  useEffect(() => {
    if (searchTask.trim() === "") {
      setIsSearchActive(false);
      setSearchResults([]);
      return;
    }

    const results = userTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTask.toLowerCase())
    );
    setSearchResults(results);
    setIsSearchActive(true);
  }, [searchTask, userTasks]);

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <SearchBar
        searchTask={searchTask}
        setSearchTask={setSearchTask}
        handleSearch={handleSearch}
      />
      <TaskTable teams={teams} tasks={isSearchActive ? searchResults : filteredTasks} onTaskUpdated={fetchTasks} />
    </>
  );
};

export default TasksPage;
