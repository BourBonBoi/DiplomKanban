import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import {getBoards, createBoard, updateBoard, deleteBoard} from "../controllers/boardController.js";

const router = express.Router();

router.get('/', authenticateUser, getBoards);
router.post('/', authenticateUser, createBoard);
router.patch('/:id', authenticateUser, updateBoard);
router.delete('/:id', authenticateUser, deleteBoard);

export default router;