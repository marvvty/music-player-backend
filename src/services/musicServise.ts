import { MusicRepository } from "../repositories/musicRepository.js";
import { Request, Response } from "express";
import { SourceType } from "../generated/prisma/index.js";
import {
  CreateDto,
  CreateMusicRequestDto,
  UpdateDto,
} from "../models/musicDto.js";

export class MusicService {
  private musicRepository: MusicRepository;

  constructor() {
    this.musicRepository = new MusicRepository();
  }

  async create(data: CreateMusicRequestDto, user_id: number) {
    return this.musicRepository.create({ ...data, user_id });
  }

  async getById(id: number, user_id?: number) {
    const music = await this.musicRepository.findById(id);

    if (!music) {
      throw new Error("Music not found");
    }

    if (music.user_id !== user_id) {
      throw new Error("Access denied");
    }

    return music;
  }

  async getAllByUser(user_id: number) {
    return this.musicRepository.findAllByUser(user_id);
  }

  async update(id: number, data: UpdateDto, user_id?: number) {
    const existingMusic = await this.musicRepository.findById(id);

    if (!existingMusic) {
      throw new Error("Music not found");
    }

    if (existingMusic.user_id !== user_id) {
      throw new Error("Access denied");
    }
    const music = await this.musicRepository.update(id, data);

    return music;
  }

  async delete(id: number, user_id?: number) {
    const existingMusic = await this.musicRepository.findById(id);

    if (!existingMusic) {
      throw new Error("Music not found");
    }

    if (existingMusic.user_id !== user_id) {
      throw new Error("Access denied");
    }

    const music = await this.musicRepository.delete(id);

    return music;
  }
}
