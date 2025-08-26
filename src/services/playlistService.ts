import { PlaylistRepository } from "../repositories/playlistRepository.js";
import {
  CreatePlaylistDto,
  UpdateDto,
  AddMusicToPlaylistDto,
  PlaylistResponseDto,
} from "../models/playlistDto.js";

export class playlistService {
  private playlistRepository: PlaylistRepository;

  constructor() {
    this.playlistRepository = new PlaylistRepository();
  }

  async create(
    data: CreatePlaylistDto,
    userId: number
  ): Promise<PlaylistResponseDto> {
    if (!data.name) {
      throw new Error("Name required");
    }

    const playlist = await this.playlistRepository.create(data, userId);

    return playlist;
  }

  async addMusicToPlaylist(data: AddMusicToPlaylistDto, userId: number) {
    const playlist = await this.playlistRepository.findById(data.playlist_id);

    if (!playlist || playlist.user_id !== userId) {
      throw new Error("Access denied");
    }

    return await this.playlistRepository.addMusicToPlaylist(data);
  }

  async getPlaylistById(id: number): Promise<PlaylistResponseDto | null> {
    const playlist = await this.playlistRepository.findById(id);
    return playlist;
  }

  async getUserPlaylists(user_id: number): Promise<PlaylistResponseDto[]> {
    const playlists = await this.playlistRepository.findAllByUser(user_id);
    return playlists;
  }

  async getAllPlaylists(): Promise<PlaylistResponseDto[]> {
    const playlists = await this.playlistRepository.findAll();
    return playlists;
  }

  async update(id: number, data: UpdateDto, user_id: number) {
    const access = await this.playlistRepository.checkOwnership(id, user_id);

    if (!access) {
      throw new Error("Access denied");
    }
    const playlist = await this.playlistRepository.update(id, data, user_id);

    return playlist;
  }

  async delete(id: number, user_id: number) {
    const access = await this.playlistRepository.checkOwnership(id, user_id);

    if (!access) {
      throw new Error("Access denied");
    }
    const playlist = await this.playlistRepository.delete(id);

    return playlist;
  }
}
