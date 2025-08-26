import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/authRepository.js";

const jwtSecret = process.env.JWT_SECRET || "supersecretjwt";
const authRepository = new AuthRepository();

interface AuthRequest extends Request {
  user_id?: number;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ error: "No token?" });
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, jwtSecret);

    const user = await authRepository.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ error: "invalid token" });
    }

    req.user_id = user.id;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}
