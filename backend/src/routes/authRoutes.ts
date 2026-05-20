import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";
import { getCurrentUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;