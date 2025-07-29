import express from "express";
import { getUserLogs, deleteUserLog, createUserLog } from "../controllers/logController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { updateLogoutTime } from "../controllers/logController.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}, getUserLogs);

router.post("/", authMiddleware, createUserLog);
router.patch("/:id/logout", authMiddleware, updateLogoutTime);
router.delete("/:id", authMiddleware, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}, deleteUserLog);

export default router;
