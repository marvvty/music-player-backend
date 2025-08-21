import { prisma } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LoginDto, RegisterDto } from "../models/authDto";

export class AuthService {
  private jwtSecret: string;

  constructor() {
    dotenv.config({ path: "../.env" });
    this.jwtSecret = process.env.JWT_SECRET || "supersecretjwt";
  }

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.users.create({
      data: {
        user_name: data.user_name,
        password: hashedPassword,
      },
    });

    return { id: user.id, user: user.user_name };
  }

  async login(data: LoginDto) {
    const userData = await prisma.users.findUnique({
      where: { user_name: data.user_name },
    });

    if (!userData) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      userData.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: userData.id }, this.jwtSecret, {
      expiresIn: "1h",
    });

    return token;
  }

  async me(userId: number) {
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { id: user.id, user: user.user_name };
  }
}
