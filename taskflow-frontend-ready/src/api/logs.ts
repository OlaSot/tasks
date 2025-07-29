import axiosInstance from "./api";

export const fetchLogs = async (token: string) => {
  const res = await axiosInstance.get("/logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteLog = async (id: string, token: string) => {
  await axiosInstance.delete(`/logs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createLog = async (token: string) => {
  const res = await axiosInstance.post(
    "/logs",
    { message: "User logged in" },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const sendLogoutTime = async (logId: string, token: string) => {
  await axiosInstance.patch(`/logs/${logId}/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
