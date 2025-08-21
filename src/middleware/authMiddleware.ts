import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

const jwtSecret = process.env.JWT_SECRET || "supersecretjwt";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers["Authorization"];
  if (!header) {
    return res.status(401).json({ error: "No token?" });
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, jwtSecret);

    const user = await prisma.users.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
  }
}
