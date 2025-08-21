import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const jwtSecret = process.env.JWT_SECRET || "supersecretjwt";
const prisma = PrismaClient;

export async function register(req: Request, res: Response) {
  const { user, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!user || !password) {
    return res
      .status(400)
      .json({ error: "UserName and password are required" });
  }

  try {
    const createUser = await prisma.users.create({
      data: {
        user,
        password: hashedPassword,
      },
    });

    res.json(createUser);
    res
      .status(201)
      .json({ message: "User registered successfully", createUser });
  } catch (error) {
    console.error("User registration error:", error);
  }
}

export async function login(req: Request, res: Response) {
  const { user, password } = req.body;
  const userData = await this.prisma.users.findUnique({
    where: { user },
  });
  if (!userData) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, userData.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = jwt.sign({ userId: userData.id }, jwtSecret, {
    expiresIn: "1h",
  });

  if (!user || !password) {
    return res
      .status(400)
      .json({ error: "UserName and password are required" });
  }
  res.json({ token, user: userData });
}

export async function me(req: Request, res: Response) {
  res.json({
    user: req.user,
    message: "User data retrieved successfully",
  });
}
