import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask); 


export default router;
