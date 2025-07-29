import UserLog from '../models/UserLog.js';

export const createUserLog = async (req, res) => {
  try {


const newLog = new UserLog({
  user: req.user.id,
  username: req.user.username,
  role: req.user.role,
  ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
  loginAt: new Date(),
  tokenName: req.headers["user-agent"], 
});

    await newLog.save();

    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ message: "Failed to create log", error: err.message });
  }
};


export const getUserLogs = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const logs = await UserLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
};


export const deleteUserLog = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const deleted = await UserLog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Log not found' });

    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete log', error: err.message });
  }
};


export const updateLogoutTime = async (req, res) => {
  try {
    const logId = req.params.id;

    const updated = await UserLog.findByIdAndUpdate(
      logId,
      { logoutTime: new Date() }, 
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update logout time" });
  }
};

