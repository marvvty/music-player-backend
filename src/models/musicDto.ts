export interface CreateMusicDto {
  title: string;
  artist?: string;
  duration?: number;
  source_type: "UPLOAD" | "URL";
  url: string;
}

export interface UpdateDto {
  title?: string;
  artist?: string;
  duration?: number;
  source_type?: "UPLOAD" | "URL";
  url?: string;
}

export interface MusicResponseDto {
  id: number;
  title: string;
  artist: string | null;
  duration: number | null;
  source_type: string;
  url: string;
  user_id: number;
  created_at: Date;
}
