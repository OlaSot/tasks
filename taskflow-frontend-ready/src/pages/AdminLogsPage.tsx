import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchLogs, deleteLog } from "../api/logs";
import { useNavigate } from "react-router-dom";

interface Log {
  _id: string;
  username: string;
  role: string;
  ip: string;
  loginAt: string;
  logoutTime?: string;
  tokenName: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminLogsPage() {
  const { token, logout } = useAuth();
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadLogs = async () => {
    try {
      const data = await fetchLogs(token!);
      setLogs(data);
    } catch (err) {
      setError("Failed to load logs");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLog(id, token!);
      setLogs((prev) => prev.filter((log) => log._id !== id));
    } catch (err) {
      alert("Failed to delete log");
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Logs</h1>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead>
              <tr className="bg-slate-700">
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">IP</th>
                <th className="p-2 border">Login</th>
                <th className="p-2 border">Logout</th>
                <th className="p-2 border">Token</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t border-gray-600">
                  <td className="p-2 border">{log.username}</td>
                  <td className="p-2 border">{log.role}</td>
                  <td className="p-2 border">{log.ip}</td>
                  <td className="p-2 border">{formatDate(log.loginAt)}</td>
                  <td className="p-2 border">
                    {log.logoutTime ? formatDate(log.logoutTime) : "-"}
                  </td>
                  <td className="p-2 border break-all">{log.tokenName}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(log._id)}
                      className="text-red-400 hover:text-red-200 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-400">
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
