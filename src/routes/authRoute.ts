import { Router } from "express";
import { login, register, me } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", (req, res) => register);
router.post("/login", (req, res) => login);
router.get("/me", (req, res) => authMiddleware, me);

export default router;
