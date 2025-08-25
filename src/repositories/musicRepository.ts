import { prisma } from "../index.js";
import { CreateDto, UpdateDto } from "../models/musicDto.js";

export class MusicRepository {
  create(data: CreateDto) {
    return prisma.music.create({ data });
  }

  findById(id: number) {
    return prisma.music.findUnique({
      where: { id },
    });
  }

  findAllByUser(user_id: number) {
    return prisma.music.findMany({ where: { user_id } });
  }

  update(id: number, data: UpdateDto) {
    return prisma.music.update({ where: { id }, data });
  }

  delete(id: number) {
    return prisma.music.delete({ where: { id } });
  }
}
