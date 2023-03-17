import { MediaArtwork, MediaDetailsBase, Properties } from "./base";
import {
  KodiMessageFilter,
  KodiMessageLimits,
  KodiMessageLimitsReturned,
  KodiMessageSort,
} from "./message";

export type VideoDetailsBase = MediaDetailsBase & {
  artwork?: MediaArtwork;
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

export type GetMoviesQuery = Properties<VideoDetailsMovie> & {
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};

export type GetMovies = {
  limits: KodiMessageLimitsReturned;
  movies: VideoDetailsMovie[];
};
