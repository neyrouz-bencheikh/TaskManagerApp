import axiosClient from "../api/axiosClient";

export const getTasks = () => axiosClient.get("/tasks");
export const getTask = (id) => axiosClient.get(`/tasks/${id}`);
export const createTask = (task) => axiosClient.post("/tasks", task);
export const updateTask = (id, task) => axiosClient.put(`/tasks/${id}`, task);
export const deleteTask = (id) => axiosClient.delete(`/tasks/${id}`);
