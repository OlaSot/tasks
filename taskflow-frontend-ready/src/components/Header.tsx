import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendLogoutTime } from "../api/logs";

export default function Header() {
  const { user, logout, token } = useAuth();

  const navigate = useNavigate();
const handleLogout = async () => {
  const logId = localStorage.getItem("logId");
  console.log("Logging out with logId:", logId); 
  if (logId) {
    try {
      await sendLogoutTime(logId, token!);
      console.log("Logout time updated"); 
    } catch (err) {
      console.warn("Failed to update logout time", err);
    }
    localStorage.removeItem("logId");
  }
  logout();
  navigate("/login");
};

  return (
    <header className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">TaskFlow</h1>
      <nav className="flex gap-6 items-center">
        {user && (
          <>
            <Link to="/home" className="hover:underline">
              Tasks
            </Link>
            {user.role === "admin" && (
              <Link to="/logs" className="hover:underline">
                User Logs
              </Link>
            )}
            <span className="text-sm text-gray-300">
              {user.username} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
