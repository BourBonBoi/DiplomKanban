import express from "express";
import {register, login, updateUser} from "../controllers/authController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticateUser, updateUser);

export default router;