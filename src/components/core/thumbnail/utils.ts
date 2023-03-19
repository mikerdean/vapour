import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCompactDisc,
  faFilm,
  faMusic,
  faTv,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { ThumbnailType } from "./types";

export const getIconByType = (type: ThumbnailType): IconDefinition => {
  switch (type) {
    case ThumbnailType.Album:
      return faCompactDisc;
    case ThumbnailType.Artist:
      return faUsers;
    case ThumbnailType.Song:
    case ThumbnailType.MusicGenre:
      return faMusic;
    case ThumbnailType.Movie:
    case ThumbnailType.MovieSet:
    case ThumbnailType.MovieGenre:
      return faFilm;
    case ThumbnailType.TVShow:
    case ThumbnailType.Season:
    case ThumbnailType.Episode:
      return faTv;
  }
};
