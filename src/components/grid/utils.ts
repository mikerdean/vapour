import { ThumbnailType } from "../core/thumbnail.types";

export const createUrl = (type: ThumbnailType, id: string | number): string => {
  switch (type) {
    case ThumbnailType.Actor:
      return `movies/actors/${id}`;
    case ThumbnailType.Album:
      return `/music/albums/${id}`;
    case ThumbnailType.Artist:
      return `/music/artists/${id}`;
    case ThumbnailType.Episode:
      return `/tv/episodes/${id}`;
    case ThumbnailType.MusicGenre:
      return `/music/genres/${id}`;
    case ThumbnailType.Movie:
      return `/movies/${id}`;
    case ThumbnailType.MovieSet:
      return `/movies/sets/${id}`;
    case ThumbnailType.MovieGenre:
      return `/movies/genres/${id}`;
    case ThumbnailType.Season:
      return `/tv/seasons/${id}`;
    case ThumbnailType.Song:
      return `/music/songs/${id}`;
    case ThumbnailType.TVShow:
      return `/tv/${id}`;
  }
};
