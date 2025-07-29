import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const { status, title } = req.query;
    const query = { createdBy: req.user.id };

    if (status === 'completed') query.completed = true;
    if (status === 'incomplete') query.completed = false;
    if (title) query.title = new RegExp(title, 'i'); 

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: e.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = new Task({
      title,
      description,
      completed: !!completed,
      createdBy: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create task', error: e.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "Only 'completed' field can be updated and must be a boolean" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { completed },
      { new: true }
    );
console.log("Requesting task update:");
console.log("User ID:", req.user.id);
console.log("Task ID:", req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (e) {
    res.status(500).json({ message: "Failed to update task", error: e.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, createdBy: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete task", error: e.message });
  }
};
