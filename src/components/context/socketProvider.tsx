import { nanoid } from "nanoid";
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { addToQueue, dequeue, removeFromQueue } from "../../socket/queue";
import {
  isKodiError,
  isKodiNotification,
  isKodiResponse,
} from "../../socket/typeguards";
import type {
  AlbumsPaged,
  ApplicationProperties,
  ApplicationPropertiesQuery,
  ArtistsPaged,
  GetAlbum,
  GetAlbumQuery,
  GetAlbumsQuery,
  GetArtist,
  GetArtistQuery,
  GetArtistsQuery,
  GetEpisode,
  GetEpisodeQuery,
  GetEpisodes,
  GetEpisodesQuery,
  GetMovie,
  GetMovieQuery,
  GetMovies,
  GetMovieSet,
  GetMovieSetDetailsQuery,
  GetMovieSets,
  GetMovieSetsQuery,
  GetMoviesQuery,
  GetMusicGenresQuery,
  GetRecentEpisodesQuery,
  GetSeason,
  GetSeasonDetailsQuery,
  GetSeasons,
  GetSeasonsQuery,
  GetSongsQuery,
  GetTVShow,
  GetTVShowDetailsQuery,
  GetTVShows,
  GetTVShowsQuery,
  GetVideoGenresQuery,
  MusicGenresPaged,
  ProfileDetails,
  ProfileDetailsPaged,
  ProfileDetailsQuery,
  ProfilesQuery,
  RecentlyAddedAlbumsQuery,
  SongsPaged,
  VideoGenresPaged,
} from "../../socket/types";
import type { NotificationMap } from "../../socket/types/notifications";
import { useConfiguration } from "./configurationProvider";
import { useHost } from "./hostProvider";
import {
  ConnectionState,
  type NotificationEventListener,
  type SocketContextType,
  type SocketMethods,
  type SocketProviderComponent,
  type SocketQueryMethods,
  type SocketState,
  type SocketUnsubscribe,
} from "./socketProvider.types";

const SocketContext = createContext<SocketContextType>([
  {} as SocketState,
  {} as SocketMethods,
]);

const timeout = 5000;

const SocketProvider: SocketProviderComponent = (props) => {
  let socket: WebSocket | undefined;

  const listeners = new Map<string, Set<NotificationEventListener>>();

  const [state, setState] = createStore<SocketState>({
    connectionState: ConnectionState.Connecting,
  });

  const [config] = useConfiguration();
  const [host] = useHost();

  const connect = (): void => {
    const url = host.websocketUrl;
    if (socket || !url) {
      return;
    }

    socket = new WebSocket(url);

    socket.onopen = () => {
      setState("connectionState", ConnectionState.Connected);
    };

    socket.onmessage = (ev: MessageEvent<string>): void => {
      try {
        const message = JSON.parse(ev.data);

        if (isKodiResponse(message)) {
          const callback = dequeue(message.id);
          if (callback) {
            callback(message);
          }

          return;
        }

        if (isKodiNotification(message)) {
          const callbacks = listeners.get(message.method);
          if (callbacks) {
            for (const callback of callbacks) {
              callback(message);
            }

            return;
          }
        }
      } catch (err) {
        // TODO: add dynamic logging output
      }
    };

    socket.onclose = () => {
      setTimeout(() => {
        setState("connectionState", ConnectionState.NotConnected);
        socket = undefined;
      }, 250);
    };
  };

  const reconnect = (): void => {
    setState("connectionState", ConnectionState.Connecting);
    socket = undefined;
    connect();
  };

  const send = async <TRequest, TResponse>(
    method: string,
    request: TRequest,
  ): Promise<TResponse> =>
    new Promise((resolve, reject) => {
      if (!socket) {
        return reject(Error("Socket not currently connected. Command failed."));
      }

      const id = nanoid();

      const timer = setTimeout(() => {
        removeFromQueue(id);
        return reject(
          Error(`Message ${id} exceeded the timeout value (${timeout})`),
        );
      }, timeout);

      addToQueue(id, (message) => {
        clearTimeout(timer);
        if (isKodiResponse<TResponse>(message)) {
          return resolve(message.result);
        }

        if (isKodiError(message)) {
          return reject(
            Error(
              `Message {${id} response returned an error from JSONRPC: ${message.error.message}`,
            ),
          );
        }

        return reject(Error(`Message ${id} response was not processed`));
      });

      try {
        socket.send(
          JSON.stringify({
            id,
            jsonrpc: "2.0",
            method,
            params: request,
          }),
        );
      } catch (err) {
        return reject(err);
      }
    });

  const disconnect = () => {
    if (socket) {
      socket.close(1001);
    }
  };

  const subscribe = <T extends keyof NotificationMap>(
    type: T,
    listener: (message: NotificationMap[T]) => void,
  ): SocketUnsubscribe => {
    let set = listeners.get(type);
    if (!set) {
      set = new Set<NotificationEventListener>();
      listeners.set(type, set);
    }

    set.add(listener as NotificationEventListener);

    return () => {
      set?.delete(listener as NotificationEventListener);
    };
  };

  const getPageLimits = (page: number): { start: number; end: number } => {
    const start = (page - 1) * config.pageSize;
    const end = start + config.pageSize;
    return { start, end };
  };

  const queries: SocketQueryMethods = {
    getAlbums: (page = 1) =>
      send<GetAlbumsQuery, AlbumsPaged>("AudioLibrary.GetAlbums", {
        limits: getPageLimits(page),
        properties: ["artist", "genre", "thumbnail", "title", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getAlbumsByAlbumArtist: (albumartist: string) =>
      send<GetAlbumsQuery, AlbumsPaged>("AudioLibrary.GetAlbums", {
        filter: { field: "albumartist", operator: "is", value: albumartist },
        properties: ["artist", "genre", "thumbnail", "title", "year"],
        sort: { method: "year", order: "ascending" },
      }),
    getAlbumById: (id: number) =>
      send<GetAlbumQuery, GetAlbum>("AudioLibrary.GetAlbumDetails", {
        albumid: id,
        properties: [
          "artist",
          "description",
          "genre",
          "rating",
          "thumbnail",
          "title",
          "year",
        ],
      }),
    getApplications: () =>
      send<ApplicationPropertiesQuery, ApplicationProperties>(
        "Application.GetProperties",
        {
          properties: [
            "language",
            "muted",
            "name",
            "sorttokens",
            "version",
            "volume",
          ],
        },
      ),
    getArtists: (page = 1) =>
      send<GetArtistsQuery, ArtistsPaged>("AudioLibrary.GetArtists", {
        albumartistsonly: true,
        limits: getPageLimits(page),
        properties: ["songgenres", "thumbnail"],
        sort: { method: "label", order: "ascending", ignorearticle: true },
      }),
    getArtistsByGenre: ({ genre, page = 1 }) =>
      send<GetArtistsQuery, ArtistsPaged>("AudioLibrary.GetArtists", {
        albumartistsonly: true,
        filter: {
          field: "genre",
          operator: "is",
          value: genre,
        },
        limits: getPageLimits(page),
        properties: ["songgenres", "thumbnail"],
        sort: { method: "label", order: "ascending", ignorearticle: true },
      }),
    getArtistById: (id: number) =>
      send<GetArtistQuery, GetArtist>("AudioLibrary.GetArtistDetails", {
        artistid: id,
        properties: ["description", "thumbnail"],
      }),
    getCurrentProfile: () =>
      send<ProfileDetailsQuery, ProfileDetails>("Profiles.GetCurrentProfile", {
        properties: ["lockmode", "thumbnail"],
      }),
    getEpisodeById: (id: number) =>
      send<GetEpisodeQuery, GetEpisode>("VideoLibrary.GetEpisodeDetails", {
        properties: [
          "art",
          "dateadded",
          "episode",
          "firstaired",
          "playcount",
          "plot",
          "rating",
          "runtime",
          "season",
          "showtitle",
          "title",
          "tvshowid",
        ],
        episodeid: id,
      }),
    getEpisodesByTVShowSeason: ({ tvshowid, season }) =>
      send<GetEpisodesQuery, GetEpisodes>("VideoLibrary.GetEpisodes", {
        properties: [
          "art",
          "episode",
          "firstaired",
          "playcount",
          "rating",
          "runtime",
          "season",
          "title",
          "tvshowid",
        ],
        sort: { method: "episode", order: "ascending" },
        season,
        tvshowid,
      }),
    getMovieById: (id: number) =>
      send<GetMovieQuery, GetMovie>("VideoLibrary.GetMovieDetails", {
        movieid: id,
        properties: [
          "art",
          "cast",
          "director",
          "genre",
          "playcount",
          "plot",
          "rating",
          "runtime",
          "set",
          "tag",
          "title",
          "writer",
          "year",
        ],
      }),
    getMovieGenres: (page = 1) =>
      send<GetVideoGenresQuery, VideoGenresPaged>("VideoLibrary.GetGenres", {
        limits: getPageLimits(page),
        properties: ["thumbnail"],
        sort: { method: "label", order: "ascending" },
        type: "movie",
      }),
    getMovies: (page = 1) =>
      send<GetMoviesQuery, GetMovies>("VideoLibrary.GetMovies", {
        limits: getPageLimits(page),
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getMoviesByGenre: ({ genre, page = 1 }: { genre: string; page: number }) =>
      send<GetMoviesQuery, GetMovies>("VideoLibrary.GetMovies", {
        filter: { field: "genre", operator: "is", value: genre },
        limits: getPageLimits(page),
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getMoviesInSets: () =>
      send<GetMoviesQuery, GetMovies>("VideoLibrary.GetMovies", {
        filter: {
          field: "set",
          operator: "isnot",
          value: "",
        },
        properties: ["set"],
        sort: { method: "title", order: "ascending" },
      }),
    getMovieSetById: (id: number) =>
      send<GetMovieSetDetailsQuery, GetMovieSet>(
        "VideoLibrary.GetMovieSetDetails",
        {
          movies: {
            properties: ["art", "playcount", "runtime", "set", "title", "year"],
            sort: { method: "year", order: "ascending" },
          },
          properties: ["art", "playcount", "title"],
          setid: id,
        },
      ),
    getMovieSets: (page = 1) =>
      send<GetMovieSetsQuery, GetMovieSets>("VideoLibrary.GetMovieSets", {
        limits: getPageLimits(page),
        properties: ["art", "playcount", "title"],
        sort: { method: "title", order: "ascending" },
      }),
    getMusicGenres: (page = 1) =>
      send<GetMusicGenresQuery, MusicGenresPaged>("AudioLibrary.GetGenres", {
        limits: getPageLimits(page),
        properties: ["thumbnail"],
        sort: { method: "label", order: "ascending" },
      }),
    getProfiles: () =>
      send<ProfilesQuery, ProfileDetailsPaged>("Profiles.GetProfiles", {
        properties: ["lockmode", "thumbnail"],
        sort: { method: "label", order: "ascending" },
      }),
    getRecentlyAddedAlbums: () =>
      send<RecentlyAddedAlbumsQuery, AlbumsPaged>(
        "AudioLibrary.GetRecentlyAddedAlbums",
        {
          properties: ["artist", "genre", "thumbnail", "title", "year"],
        },
      ),
    getRecentlyAddedEpisodes: () =>
      send<GetRecentEpisodesQuery, GetEpisodes>(
        "VideoLibrary.GetRecentlyAddedEpisodes",
        {
          properties: [
            "art",
            "episode",
            "playcount",
            "rating",
            "runtime",
            "season",
            "showtitle",
            "title",
            "tvshowid",
          ],
          sort: { method: "dateadded", order: "descending" },
        },
      ),
    getRecentlyAddedMovies: () =>
      send<GetMoviesQuery, GetMovies>("VideoLibrary.GetRecentlyAddedMovies", {
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
      }),
    getSeasonById: (id: number) =>
      send<GetSeasonDetailsQuery, GetSeason>("VideoLibrary.GetSeasonDetails", {
        properties: [
          "art",
          "episode",
          "season",
          "title",
          "tvshowid",
          "userrating",
          "watchedepisodes",
        ],
        seasonid: id,
      }),
    getSeasonsByTVShow: (tvshowid: number) =>
      send<GetSeasonsQuery, GetSeasons>("VideoLibrary.GetSeasons", {
        properties: [
          "art",
          "episode",
          "title",
          "userrating",
          "watchedepisodes",
        ],
        sort: { method: "title", order: "ascending" },
        tvshowid,
      }),
    getSongs: (page = 1) =>
      send<GetSongsQuery, SongsPaged>("AudioLibrary.GetSongs", {
        limits: getPageLimits(page),
        properties: ["disc", "duration", "track", "title", "year"],
        sort: { method: "track", order: "ascending" },
      }),
    getSongsByAlbum: ({ album, artist, year }) =>
      send<GetSongsQuery, SongsPaged>("AudioLibrary.GetSongs", {
        filter: {
          and: [
            {
              field: "albumartist",
              operator: "is",
              value: artist?.toString() || "",
            },
            { field: "album", operator: "is", value: album || "" },
            { field: "year", operator: "is", value: (year || 0).toString() },
          ],
        },
        properties: ["disc", "duration", "track", "title", "year"],
        sort: { method: "year", order: "ascending" },
      }),
    getTVShowById: (id: number) =>
      send<GetTVShowDetailsQuery, GetTVShow>("VideoLibrary.GetTVShowDetails", {
        properties: [
          "art",
          "episode",
          "season",
          "title",
          "watchedepisodes",
          "year",
        ],
        tvshowid: id,
      }),
    getTVShowsByGenre: ({ genre, page }) =>
      send<GetTVShowsQuery, GetTVShows>("VideoLibrary.GetTVShows", {
        filter: { field: "genre", operator: "is", value: genre },
        limits: getPageLimits(page),
        properties: ["art", "episode", "title", "watchedepisodes", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getTVShowGenres: (page = 1) =>
      send<GetVideoGenresQuery, VideoGenresPaged>("VideoLibrary.GetGenres", {
        limits: getPageLimits(page),
        properties: ["thumbnail"],
        sort: { method: "label", order: "ascending" },
        type: "tvshow",
      }),
    getTVShows: (page = 1) =>
      send<GetTVShowsQuery, GetTVShows>("VideoLibrary.GetTVShows", {
        limits: getPageLimits(page),
        properties: ["art", "episode", "title", "watchedepisodes", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getTVShowsInProgress: () =>
      send<GetTVShowsQuery, GetTVShows>("VideoLibrary.GetInProgressTVShows", {
        properties: ["art", "episode", "title", "watchedepisodes", "year"],
        sort: { method: "title", order: "ascending" },
      }),
  };

  return (
    <SocketContext.Provider
      value={[state, { connect, disconnect, reconnect, subscribe, ...queries }]}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export default SocketProvider;
export { useSocket };
