import { MusicRepository } from "../repositories/musicRepository.js";
import {
  CreateMusicDto,
  MusicResponseDto,
  UpdateDto,
} from "../models/musicDto.js";

export class MusicService {
  private musicRepository: MusicRepository;

  constructor() {
    this.musicRepository = new MusicRepository();
  }

  async create(
    data: CreateMusicDto,
    userId: number
  ): Promise<MusicResponseDto> {
    if (!data.title || !data.url) {
      throw new Error("Title and Url required");
    }

    const music = await this.musicRepository.create(data, userId);

    return music;
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

    if (!access) {
      throw new Error("Access denied");
    }

    const music = await this.musicRepository.delete(id);

    return music;
  }
}
