import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { AddTask, GetTask, UpdateTask } from "../Models/Task";

const api = "http://localhost:5295/api/task/";

export const AddTaskAPI = async (
title: string, description: string, status: string, priority: string, dueDate: string, teamId: number, userId: string) => {
  try {
    const data = await axios.post<AddTask>(api, {
      title,
      description,
      status,
      priority,
      dueDate,
      userId,
      teamId
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const GetTaskAPI = async () => {
  try {
    const data = await axios.get<GetTask[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const UpdateTaskAPI = async (id: number, updatedTask: UpdateTask) => {
  try {
    const data = await axios.put<UpdateTask>(`${api}${id}`, updatedTask)
    return data;
  } catch (error) {
    handleError(error);
  }
}
