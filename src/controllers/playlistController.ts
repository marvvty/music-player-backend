import { Request, Response } from "express";
import { playlistService } from "../services/playlistService.js";
import { CreatePlaylistDto, UpdateDto } from "../models/playlistDto.js";
export class PlaylistController {
  private playlistService: playlistService;

  constructor() {
    this.playlistService = new playlistService();
  }

  async create(req: Request, res: Response) {
    try {
      const data: CreatePlaylistDto = req.body;
      const user_id = req.user_id;

      if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const playlist = await this.playlistService.create(data, user_id);

      res.status(201).json(playlist);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async addMusicToPlaylist(req: Request, res: Response) {
    try {
      const data = req.body;
      const user_id = req.user_id;
      if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const playlist = await this.playlistService.addMusicToPlaylist(
        data,
        user_id
      );
      res.status(200).json(playlist);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async deleteMusicFromPlaylist(req: Request, res: Response) {
    try {
      const data = req.body;
      const user_id = req.user_id;
      if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const playlist = await this.playlistService.deleteMusicFromPlaylist(
        data,
        user_id
      );

      res.status(200).json(playlist);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const playlist = await this.playlistService.getPlaylistById(id);

      res.status(200).json(playlist);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id, 10);
      const playlists = await this.playlistService.getUserPlaylists(user_id);

      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const playlists = await this.playlistService.getAllPlaylists();

      res.status(200).json(playlists);
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

      const playlist = await this.playlistService.update(id, data, user_id);

      res.status(200).json(playlist);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const user_id = req.user_id;

      if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const playlist = await this.playlistService.delete(id, user_id);

      res.status(200).json(playlist);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
