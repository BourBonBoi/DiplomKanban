import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import {createTask, getTasks, updateTask, deleteTask} from "../controllers/taskController.js";

const router = express.Router();

router.post('/', authenticateUser, createTask);
router.post('/:id', authenticateUser, getTasks);
router.patch('/:id', authenticateUser, updateTask);
router.delete('/:id', authenticateUser, deleteTask);

export default router;