import { Request, Response } from "express";
import { MusicService } from "../services/musicServise.js";
import { CreateDto, UpdateDto } from "../models/musicDto.js";
import { SourceType } from "../generated/prisma/index.js";

export class MusicController {
  private musicService: MusicService;

  constructor() {
    this.musicService = new MusicService();
  }

  async create(req: Request, res: Response) {
    try {
      const data: CreateDto = req.body;
      const user_id = req.user!.user_id;
      const music = await this.musicService.create(data, user_id);

      res.status(201).json(music);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const music = await this.musicService.getById(id);

      res.status(200).json(music);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id, 10);
      const musicList = await this.musicService.getAllByUser(user_id);

      res.status(200).json(musicList);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const data: UpdateDto = req.body;
      const music = await this.musicService.update(id, data);

      res.status(200).json(music);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      await this.musicService.delete(id);

      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }
}
