import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); 
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4">
      <div className="bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 w-full max-w-md text-center border border-slate-700">
        <h1 className="text-4xl font-bold mb-6">Welcome to TaskFlow</h1>
        <p className="mb-8 text-gray-300">
          Manage your tasks efficiently and stay organized.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors text-white font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
