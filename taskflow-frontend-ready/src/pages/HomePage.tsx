import { useState, useEffect } from "react";

import {
  fetchTasks as fetchTasksAPI,
  updateTaskStatus,
  createTask,
} from "../api/task";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    try {
      const fetched = await fetchTasksAPI(token!);
      setTasks(fetched);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed" && !task.completed) return false;
    if (filter === "incomplete" && task.completed) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;
    setLoading(true);
    try {
      await createTask(
        {
          title: newTitle,
          description: newDescription,
          completed: false,
        },
        token!
      );
      setNewTitle("");
      setNewDescription("");
      loadTasks();
    } catch (err) {
      console.error("Failed to add task", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: boolean) => {
    try {
      await updateTaskStatus(taskId, !currentStatus, token!);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Task Manager</h1>

        {/* Add Task */}
        <div className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="New task title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            disabled={loading}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex gap-2">
            {["all", "completed", "incomplete"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1 rounded-full border ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="bg-slate-800 px-5 py-4 rounded shadow cursor-pointer"
              onClick={() => toggleTaskStatus(task._id, task.completed)}
            >
              <div className="flex justify-between items-center mb-1">
                <h3
                  className={`text-lg font-semibold ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    task.completed
                      ? "bg-green-700 text-green-100"
                      : "bg-yellow-600 text-yellow-100"
                  }`}
                >
                  {task.completed ? "Done" : "To Do"}
                </span>
              </div>
              {task.description && (
                <p className="text-sm text-gray-400">{task.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
