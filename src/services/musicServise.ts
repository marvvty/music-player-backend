import { MusicRepository } from "../repositories/musicRepository.js";
import {
  CreateMusicDto,
  MusicResponseDto,
  UpdateDto,
} from "../models/musicDto.js";
import { FileStorage } from "../utils/fileStorage.js";
import { Request } from "express";

export class MusicService {
  private musicRepository: MusicRepository;

  constructor() {
    this.musicRepository = new MusicRepository();
  }

  async create(req: Request, userId: number) {
    if (req.body && req.body.source_type === "URL") {
      const data: CreateMusicDto = req.body;

      if (!data.title) {
        throw new Error("Title is required");
      }
      if (!data.url) {
        throw new Error("URL required for URL source type");
      }

      return await this.musicRepository.create(data, userId);
    } else {
      const savedPath = await FileStorage.saveMusic(req);

      const data: CreateMusicDto = {
        title: (req.headers["x-title"] as string) || "Untitled",
        artist: req.headers["x-artist"] as string,
        duration: req.headers["x-duration"]
          ? Number(req.headers["x-duration"])
          : undefined,
        source_type: "UPLOAD",
        url: savedPath,
      };

      return await this.musicRepository.create(data, userId);
    }
  }

  async getMusicById(id: number): Promise<MusicResponseDto | null> {
    const music = await this.musicRepository.findById(id);
    return music;
  }

  async getUserMusic(user_id: number): Promise<MusicResponseDto[]> {
    const music = await this.musicRepository.findAllByUser(user_id);
    return music;
  }

  async getAllMusic(): Promise<MusicResponseDto[]> {
    const music = await this.musicRepository.findAll();
    return music;
  }

  async update(id: number, data: UpdateDto, user_id: number) {
    const access = await this.musicRepository.checkOwnership(id, user_id);

    if (!access) {
      throw new Error("Access denied");
    }
    const music = await this.musicRepository.update(id, data, user_id);

    return music;
  }

  async delete(id: number, user_id: number) {
    const access = await this.musicRepository.checkOwnership(id, user_id);
    const musicId = await this.musicRepository.findById(id);

    if (!access) {
      throw new Error("Access denied");
    }

    if (musicId?.source_type === "UPLOAD") {
      await FileStorage.deleteMusic(musicId.url);
    }

    const music = await this.musicRepository.delete(id);

    return music;
  }
}
