import { prisma } from "../index.js";
import { CreatePlaylistDto, UpdateDto } from "../models/playlistDto.js";

export class PlaylistRepository {
  async create(data: CreatePlaylistDto, userId: number) {
    return await prisma.playlists.create({
      data: {
        name: data.name,
        users: { connect: { id: userId } },
      },
    });
  }

  async addMusicToPlaylist(data: { playlist_id: number; music_id: number }) {
    return await prisma.playlist_music.create({
      data: {
        playlist_id: data.playlist_id,
        music_id: data.music_id,
      },
    });
  }

  async deleteMusicFromPlaylist(data: {
    playlist_id: number;
    music_id: number;
  }) {
    return await prisma.playlist_music.deleteMany({
      where: {
        playlist_id: data.playlist_id,
        music_id: data.music_id,
      },
    });
  }

  async getMusicFromPlaylist(playlist_id: number) {
    return await prisma.playlist_music.findMany({
      where: { playlist_id },
      include: {
        music: true,
      },
    });
  }

  async findById(id: number) {
    return await prisma.playlists.findUnique({
      where: { id },
    });
  }

  async findAllByUser(user_id: number) {
    return await prisma.playlists.findMany({
      where: { user_id },
      orderBy: { created_at: "desc" },
    });
  }

  async findAll(limit?: number) {
    return await prisma.playlists.findMany({
      orderBy: { created_at: "desc" },
      take: limit || undefined,
    });
  }

  async update(id: number, data: UpdateDto, userId: number) {
    return await prisma.playlists.updateMany({
      where: { id, user_id: userId },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.playlists.deleteMany({ where: { id } });
  }

  async checkOwnership(id: number, userId: number) {
    const playlist = await prisma.playlists.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    return !!playlist;
  }
}
