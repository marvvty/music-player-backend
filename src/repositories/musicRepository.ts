import { prisma } from "../index.js";
import { CreateMusicDto, UpdateDto } from "../models/musicDto.js";

export class MusicRepository {
  async create(data: CreateMusicDto, userId: number) {
    return await prisma.music.create({
      data: {
        title: data.title,
        artist: data.artist || null,
        duration: data.duration || null,
        source_type: data.source_type,
        url: data.url,
        users: { connect: { id: userId } },
      },
    });
  }

  async findById(id: number) {
    return await prisma.music.findUnique({
      where: { id },
    });
  }

  async findAllByUser(user_id: number) {
    return await prisma.music.findMany({
      where: { user_id },
      orderBy: { created_at: "desc" },
    });
  }

  async findAll(limit?: number) {
    return await prisma.music.findMany({
      orderBy: { created_at: "desc" },
      take: limit || undefined,
    });
  }

  async update(id: number, data: UpdateDto, userId: number) {
    return await prisma.music.updateMany({
      where: { id, user_id: userId },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.music.deleteMany({ where: { id } });
  }

  async checkOwnership(id: number, userId: number) {
    const song = await prisma.music.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    return !!song;
  }
}
