import type { ParentComponent } from "solid-js";

import type {
  AlbumsPaged,
  ApplicationProperties,
  ArtistsPaged,
  GetAlbum,
  GetArtist,
  GetEpisode,
  GetEpisodes,
  GetMovie,
  GetMovies,
  GetMovieSet,
  GetMovieSets,
  GetSeason,
  GetSeasons,
  GetTVShow,
  GetTVShows,
  MusicGenresPaged,
  ProfileDetails,
  ProfileDetailsPaged,
  SongsPaged,
  VideoGenresPaged,
} from "../../socket/types";
import type { NotificationMap } from "../../socket/types/notifications";

export enum ConnectionState {
  NotConnected,
  Connecting,
  Connected,
}

export type NotificationEventListener = (message: unknown) => void;

export type SocketState = {
  connectionState: ConnectionState;
};

export type SocketUnsubscribe = () => void;

export type SocketQueryMethods = {
  getAlbumById: (id: number) => Promise<GetAlbum>;
  getAlbums: (page: number) => Promise<AlbumsPaged>;
  getAlbumsByAlbumArtist: (albumartist: string) => Promise<AlbumsPaged>;
  getApplications: () => Promise<ApplicationProperties>;
  getArtists: () => Promise<ArtistsPaged>;
  getArtistsByGenre: (query: {
    genre: string;
    page: number;
  }) => Promise<ArtistsPaged>;
  getArtistById: (id: number) => Promise<GetArtist>;
  getCurrentProfile: () => Promise<ProfileDetails>;
  getEpisodeById: (id: number) => Promise<GetEpisode>;
  getEpisodesByTVShowSeason: (query: {
    tvshowid: number;
    season: number;
  }) => Promise<GetEpisodes>;
  getMovieById: (id: number) => Promise<GetMovie>;
  getMovieGenres: (page: number) => Promise<VideoGenresPaged>;
  getMovies: (page: number) => Promise<GetMovies>;
  getMoviesByGenre: (query: {
    genre: string;
    page: number;
  }) => Promise<GetMovies>;
  getMoviesInSets: () => Promise<GetMovies>;
  getMovieSetById: (id: number) => Promise<GetMovieSet>;
  getMovieSets: (page: number) => Promise<GetMovieSets>;
  getMusicGenres: (page: number) => Promise<MusicGenresPaged>;
  getProfiles: () => Promise<ProfileDetailsPaged>;
  getRecentlyAddedAlbums: () => Promise<AlbumsPaged>;
  getRecentlyAddedEpisodes: () => Promise<GetEpisodes>;
  getRecentlyAddedMovies: () => Promise<GetMovies>;
  getSeasonById: (id: number) => Promise<GetSeason>;
  getSeasonsByTVShow: (tvshowid: number) => Promise<GetSeasons>;
  getSongs: (page: number) => Promise<SongsPaged>;
  getSongsByAlbum: (query: {
    album?: string;
    artist?: string | string[];
    year?: number;
  }) => Promise<SongsPaged>;
  getTVShowById: (id: number) => Promise<GetTVShow>;
  getTVShowsByGenre: (query: {
    genre: string;
    page: number;
  }) => Promise<GetTVShows>;
  getTVShowGenres: (page: number) => Promise<VideoGenresPaged>;
  getTVShows: (page: number) => Promise<GetTVShows>;
  getTVShowsInProgress: () => Promise<GetTVShows>;
};

export type SocketMethods = SocketQueryMethods & {
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
  subscribe: <T extends keyof NotificationMap>(
    type: T,
    listener: (message: NotificationMap[T]) => void,
  ) => SocketUnsubscribe;
};

export type SocketContextType = [SocketState, SocketMethods];

export type SocketProviderComponent = ParentComponent;
