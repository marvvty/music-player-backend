import { Request, Response } from "express";
import { MusicService } from "../services/musicServise.js";
import { CreateMusicDto, UpdateDto } from "../models/musicDto.js";
export class MusicController {
  private musicService: MusicService;

  constructor() {
    this.musicService = new MusicService();
  }

  async create(req: Request, res: Response) {
    try {
      const data: CreateMusicDto = req.body;
      const user_id = req.user_id;

      if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const music = await this.musicService.create(data, user_id);

      res.status(201).json(music);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const music = await this.musicService.getMusicById(id);

      res.status(200).json(music);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id, 10);
      const musicList = await this.musicService.getUserMusic(user_id);

      res.status(200).json(musicList);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const musicList = await this.musicService.getAllMusic();

      res.status(200).json(musicList);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const data: UpdateDto = req.body;
      const user_id = req.user_id;

      if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const music = await this.musicService.update(id, data, user_id);

      res.status(200).json(music);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
    res.status(400).json({ message: "Something got wrong" });
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const user_id = req.user_id;

      if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      await this.musicService.delete(id, user_id);

      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }
}
