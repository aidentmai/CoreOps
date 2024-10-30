import { useState } from "react";
import { toast } from "react-toastify";
import { UpdateTaskAPI } from "../Services/TaskService";
import { GetTask, UpdateTask } from "../Models/Task";

interface UpdateTaskFormProps {
  id: number;
  selectedTask: GetTask | null;
  onClose: () => void;
  onTaskUpdated: () => void;
}

const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({
  id,
  selectedTask,
  onClose,
  onTaskUpdated,
}: UpdateTaskFormProps) => {
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create updated task object
    const updatedTask: UpdateTask = {
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      status: status,
      priority: priority,
      dueDate: dueDate,
      updatedAt: new Date().toISOString(),
    };

    // Update task
    try {
      await UpdateTaskAPI(id, updatedTask);
      onTaskUpdated();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div
      id="crud-modal"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedTask?.title}
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
          <form className="p-4" onSubmit={handleUpdateTask}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">{selectedTask?.description}</div>
              <div>
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
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
              <div className="col-span-2">
                <label
                  htmlFor="dueDate"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
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
              Update Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskForm;
