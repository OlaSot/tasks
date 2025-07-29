import axiosInstance from "./api";

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const register = async (username: string, password: string, role: string) => {
  const response = await axiosInstance.post("/auth/register", {
    username,
    password,
    role,
  });
  return response.data;
};
