import type { MediaArtwork, MediaDetailsBase, Properties } from "./base";
import type { LibraryDetailsGenre } from "./library";
import type {
  KodiMessageFilter,
  KodiMessageLimits,
  KodiMessageLimitsReturned,
  KodiMessageSort,
} from "./message";

export type VideoDetailsBase = MediaDetailsBase & {
  art?: MediaArtwork;
  playcount?: number;
};

export type VideoDetailsMedia = VideoDetailsBase & {
  title?: string;
};

export type VideoDetailsItem = VideoDetailsMedia & {
  dateadded?: string;
  file?: string;
  lastplayed?: string;
  plot?: string;
};

export type VideoResume = {
  position?: number;
  total?: number;
};

export type VideoStreamsAudio = {
  channels?: number;
  codec?: string;
  language?: string;
};

export type VideoStreamsSubtitle = {
  language?: string;
};

export type VideoStreamsVideo = {
  aspect?: number;
  codec?: string;
  duration?: number;
  height?: number;
  width?: number;
};

export type VideoStreams = {
  audio?: VideoStreamsAudio[];
  subtitle?: VideoStreamsSubtitle[];
  video?: VideoStreamsVideo[];
};

export type VideoDetailsFile = VideoDetailsItem & {
  director?: string[];
  resume?: VideoResume;
  runtime?: number;
  streamdetails?: VideoStreams;
};

export type VideoDetailsCast = {
  name: string;
  order: number;
  role: string;
  thumbnail?: string;
};

export type VideoDetailsMovie = VideoDetailsFile & {
  cast?: VideoDetailsCast[];
  country?: string[];
  genre?: string[];
  imdbnumber?: string;
  movieid: number;
  mpaa?: string;
  originaltitle?: string;
  plotoutline?: string;
  premiered?: string;
  rating?: number;
  set?: string;
  setid?: number;
  showlink?: string[];
  sorttitle?: string;
  studio?: string[];
  tag?: string[];
  tagline?: string;
  top250?: number;
  trailer?: string;
  uniqueid?: number;
  userrating?: number;
  votes?: string;
  writer?: string;
  year?: number;
};

export type VideoDetailsMovieSet = VideoDetailsMedia & {
  plot?: string;
  setid: number;
};

export type GetMoviesQuery = Properties<VideoDetailsMovie> & {
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};

export type GetMovies = {
  limits: KodiMessageLimitsReturned;
  movies: VideoDetailsMovie[];
};

export type GetMovieSetsQuery = Properties<VideoDetailsMovieSet> & {
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};

export type GetMovieSets = {
  limits: KodiMessageLimitsReturned;
  sets: VideoDetailsMovieSet[];
};

export type GetVideoGenresQuery = Properties<LibraryDetailsGenre> & {
  limits?: KodiMessageLimits;
  sort: KodiMessageSort;
  type: "movie" | "tvshow" | "musicvideo";
};

export type VideoGenresPaged = {
  genres: LibraryDetailsGenre[];
  limits: KodiMessageLimitsReturned;
};
