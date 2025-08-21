import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LoginDto, RegisterDto } from "../models/authDto";

export class AuthService {
  private prisma: PrismaClient;
  private jwtSecret: string;

  constructor() {
    dotenv.config({ path: "../.env" });
    this.jwtSecret = process.env.JWT_SECRET || "supersecretjwt";
    this.prisma = new PrismaClient();
  }

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.users.create({
      data: {
        user: data.user,
        password: hashedPassword,
      },
    });

    return { id: user.id, user: user.user };
  }

  async login(data: LoginDto) {
    const userData = await this.prisma.users.findUnique({
      where: { user: data.user },
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
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { id: user.id, user: user.user };
  }
}
