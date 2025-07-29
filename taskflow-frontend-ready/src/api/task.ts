import axiosInstance from "./api";

interface CreateTaskInput {
  title: string;
  description: string;
  completed?: boolean;
}

export const fetchTasks = async (token: string) => {
  const response = await axiosInstance.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTask = async (
  data: CreateTaskInput,
  token: string
) => {
  const response = await axiosInstance.post("/tasks", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTaskStatus = async (
  id: string,
  completed: boolean,
  token: string
) => {
  const response = await axiosInstance.put(
    `/tasks/${id}`,
    { completed },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
