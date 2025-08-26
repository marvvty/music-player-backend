export interface CreatePlaylistDto {
  name: string;
}

export interface PlaylistResponseDto {
  id: number;
  name: string;
  user_id: number;
  created_at: Date | null;
}

export interface AddMusicToPlaylistDto {
  playlist_id: number;
  music_id: number;
}

export interface UpdateDto {
  name?: string;
}

export interface PlaylistWithMusicDto {
  id: number;
  name: string;
  user_id: number;
  created_at: Date;
  music: {
    id: number;
    title: string;
    artist: string | null;
    duration: number | null;
    source_type: string;
    url: string;
    user_id: number;
    created_at: Date;
  }[];
}
