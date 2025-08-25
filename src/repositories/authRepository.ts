import { prisma } from "../index.js";
import { LoginDto, RegisterDto } from "../models/authDto";

export class AuthRepository {
  async register(data: RegisterDto, password: string) {
    return await prisma.users.create({
      data: {
        user_name: data.user_name,
        password: data.password,
      },
    });
  }

  async findByUsername(user_name: string) {
    return await prisma.users.findUnique({
      where: { user_name },
    });
  }

  async findById(id: number) {
    return await prisma.users.findUnique({
      where: { id },
    });
  }
}
