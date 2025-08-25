import { SourceType } from "../generated/prisma/index.js";

export interface CreateDto {
  user_id: number;
  title: string;
  artist?: string;
  duration?: number;
  source_type: SourceType;
  url: string;
}

export interface UpdateDto {
  title?: string;
  artist?: string;
  duration?: number;
  source_type?: SourceType;
  url?: string;
}

export interface CreateMusicRequestDto {
  title: string;
  artist?: string;
  duration?: number;
  source_type: SourceType;
  url: string;
}
