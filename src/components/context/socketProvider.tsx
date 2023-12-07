import { DateTime } from "luxon";
import { nanoid } from "nanoid";
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { addToQueue, dequeue, removeFromQueue } from "../../socket/queue";
import {
  isKodiError,
  isKodiNotification,
  isKodiResponse,
} from "../../socket/typeguards";
import {
  GetPlayerProperties,
  GetPlayerPropertiesQuery,
  GetPlayers,
  GetPlayersQuery,
  type AlbumsPaged,
  type ApplicationProperties,
  type ApplicationPropertiesQuery,
  type ArtistsPaged,
  type GetActivePlayers,
  type GetAlbum,
  type GetAlbumQuery,
  type GetAlbumsQuery,
  type GetArtist,
  type GetArtistQuery,
  type GetArtistsQuery,
  type GetEpisode,
  type GetEpisodeQuery,
  type GetEpisodes,
  type GetEpisodesQuery,
  type GetMovie,
  type GetMovieQuery,
  type GetMovies,
  type GetMovieSet,
  type GetMovieSetDetailsQuery,
  type GetMovieSets,
  type GetMovieSetsQuery,
  type GetMoviesQuery,
  type GetMusicGenresQuery,
  type GetPlayerItem,
  type GetPlayerItemQuery,
  type GetRecentEpisodesQuery,
  type GetSeason,
  type GetSeasonDetailsQuery,
  type GetSeasons,
  type GetSeasonsQuery,
  type GetSong,
  type GetSongQuery,
  type GetSongsQuery,
  type GetTVShow,
  type GetTVShowDetailsQuery,
  type GetTVShows,
  type GetTVShowsQuery,
  type GetVideoGenresQuery,
  type MediaType,
  type MusicGenresPaged,
  type ProfileDetails,
  type ProfileDetailsPaged,
  type ProfileDetailsQuery,
  type ProfilesQuery,
  type RecentlyAddedAlbumsQuery,
  type SongsPaged,
  type VideoGenresPaged,
} from "../../socket/types";
import type { NotificationMap } from "../../socket/types/notifications";
import { useConfiguration } from "./configurationProvider";
import { useHost } from "./hostProvider";
import {
  ConnectionState,
  type Cached,
  type NotificationEventListener,
  type SocketContextType,
  type SocketMethods,
  type SocketProviderComponent,
  type SocketQueryMethods,
  type SocketState,
  type SocketUnsubscribe,
} from "./socketProvider.types";
import { createHash } from "./socketProvider.utils";

const SocketContext = createContext<SocketContextType>([
  {} as SocketState,
  {} as SocketMethods,
]);

const timeout = 5000;

const SocketProvider: SocketProviderComponent = (props) => {
  let socket: WebSocket | undefined;

  const cache = new Map<string, Cached>();
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

        if (isKodiResponse(message) || isKodiError(message)) {
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
              callback(message.params);
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

  const send = <TParams, TResponse>(
    method: string,
    params: TParams,
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
              `Message ${id} response returned an error from JSONRPC: ${message.error.message}`,
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
            params,
          }),
        );
      } catch (err) {
        return reject(err);
      }
    });

  const retrieve = async <TParams, TResponse>(
    method: string,
    params: TParams,
  ): Promise<TResponse> => {
    const hash = await createHash(params);
    const cacheKey = `${method}.${hash}`;
    const cached = cache.get(cacheKey);
    const now = DateTime.utc();

    if (cached) {
      const expiresBy = DateTime.fromISO(cached.expires);
      if (now < expiresBy) {
        return cached.value as TResponse;
      }

      cache.delete(hash);
    }

    const value = await send<TParams, TResponse>(method, params);

    const expires = now.plus({ minutes: 5 }).toISO();
    if (expires) {
      cache.set(cacheKey, { expires, value });
    }

    return value;
  };

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
    getActivePlayers: () =>
      retrieve<Record<string, never>, GetActivePlayers>(
        "Player.GetActivePlayers",
        {},
      ),
    getAlbums: (page = 1) =>
      retrieve<GetAlbumsQuery, AlbumsPaged>("AudioLibrary.GetAlbums", {
        limits: getPageLimits(page),
        properties: ["artist", "genre", "thumbnail", "title", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getAlbumsByAlbumArtist: (albumartist: string) =>
      retrieve<GetAlbumsQuery, AlbumsPaged>("AudioLibrary.GetAlbums", {
        filter: { field: "albumartist", operator: "is", value: albumartist },
        properties: ["artist", "genre", "thumbnail", "title", "year"],
        sort: { method: "year", order: "ascending" },
      }),
    getAlbumById: (id: number) =>
      retrieve<GetAlbumQuery, GetAlbum>("AudioLibrary.GetAlbumDetails", {
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
      retrieve<ApplicationPropertiesQuery, ApplicationProperties>(
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
      retrieve<GetArtistsQuery, ArtistsPaged>("AudioLibrary.GetArtists", {
        albumartistsonly: true,
        limits: getPageLimits(page),
        properties: ["songgenres", "thumbnail"],
        sort: { method: "label", order: "ascending", ignorearticle: true },
      }),
    getArtistsByGenre: ({ genre, page = 1 }) =>
      retrieve<GetArtistsQuery, ArtistsPaged>("AudioLibrary.GetArtists", {
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
      retrieve<GetArtistQuery, GetArtist>("AudioLibrary.GetArtistDetails", {
        artistid: id,
        properties: ["description", "thumbnail"],
      }),
    getCurrentProfile: () =>
      retrieve<ProfileDetailsQuery, ProfileDetails>(
        "Profiles.GetCurrentProfile",
        {
          properties: ["lockmode", "thumbnail"],
        },
      ),
    getEpisodeById: (id: number) =>
      retrieve<GetEpisodeQuery, GetEpisode>("VideoLibrary.GetEpisodeDetails", {
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
      retrieve<GetEpisodesQuery, GetEpisodes>("VideoLibrary.GetEpisodes", {
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
      retrieve<GetMovieQuery, GetMovie>("VideoLibrary.GetMovieDetails", {
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
      retrieve<GetVideoGenresQuery, VideoGenresPaged>(
        "VideoLibrary.GetGenres",
        {
          limits: getPageLimits(page),
          properties: ["thumbnail"],
          sort: { method: "label", order: "ascending" },
          type: "movie",
        },
      ),
    getMovies: (page = 1) =>
      retrieve<GetMoviesQuery, GetMovies>("VideoLibrary.GetMovies", {
        limits: getPageLimits(page),
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getMoviesByGenre: ({ genre, page = 1 }: { genre: string; page: number }) =>
      retrieve<GetMoviesQuery, GetMovies>("VideoLibrary.GetMovies", {
        filter: { field: "genre", operator: "is", value: genre },
        limits: getPageLimits(page),
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getMoviesInSets: () =>
      retrieve<GetMoviesQuery, GetMovies>("VideoLibrary.GetMovies", {
        filter: {
          field: "set",
          operator: "isnot",
          value: "",
        },
        properties: ["set"],
        sort: { method: "title", order: "ascending" },
      }),
    getMovieSetById: (id: number) =>
      retrieve<GetMovieSetDetailsQuery, GetMovieSet>(
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
      retrieve<GetMovieSetsQuery, GetMovieSets>("VideoLibrary.GetMovieSets", {
        limits: getPageLimits(page),
        properties: ["art", "playcount", "title"],
        sort: { method: "title", order: "ascending" },
      }),
    getMusicGenres: (page = 1) =>
      retrieve<GetMusicGenresQuery, MusicGenresPaged>(
        "AudioLibrary.GetGenres",
        {
          limits: getPageLimits(page),
          properties: ["thumbnail"],
          sort: { method: "label", order: "ascending" },
        },
      ),
    getPlayers: (type: MediaType) =>
      retrieve<GetPlayersQuery, GetPlayers>("Player.GetPlayers", {
        media: type,
      }),
    getPlayerItem: (id: number) =>
      retrieve<GetPlayerItemQuery, GetPlayerItem>("Player.GetItem", {
        playerid: id,
        properties: [],
      }),
    getPlayerProperties: (id: number) =>
      retrieve<GetPlayerPropertiesQuery, GetPlayerProperties>(
        "Player.GetProperties",
        {
          properties: [
            "audiostreams",
            "cachepercentage",
            "canchangespeed",
            "canmove",
            "canrepeat",
            "canrotate",
            "canseek",
            "canshuffle",
            "canzoom",
            "currentaudiostream",
            "currentsubtitle",
            "currentvideostream",
            "live",
            "partymode",
            "percentage",
            "playlistid",
            "position",
            "repeat",
            "shuffled",
            "speed",
            "subtitleenabled",
            "subtitles",
            "time",
            "totaltime",
            "type",
            "videostreams",
          ],
          playerid: id,
        },
      ),
    getProfiles: () =>
      retrieve<ProfilesQuery, ProfileDetailsPaged>("Profiles.GetProfiles", {
        properties: ["lockmode", "thumbnail"],
        sort: { method: "label", order: "ascending" },
      }),
    getRecentlyAddedAlbums: () =>
      retrieve<RecentlyAddedAlbumsQuery, AlbumsPaged>(
        "AudioLibrary.GetRecentlyAddedAlbums",
        {
          properties: ["artist", "genre", "thumbnail", "title", "year"],
        },
      ),
    getRecentlyAddedEpisodes: () =>
      retrieve<GetRecentEpisodesQuery, GetEpisodes>(
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
      retrieve<GetMoviesQuery, GetMovies>(
        "VideoLibrary.GetRecentlyAddedMovies",
        {
          properties: ["art", "playcount", "runtime", "set", "title", "year"],
        },
      ),
    getSeasonById: (id: number) =>
      retrieve<GetSeasonDetailsQuery, GetSeason>(
        "VideoLibrary.GetSeasonDetails",
        {
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
        },
      ),
    getSeasonsByTVShow: (tvshowid: number) =>
      retrieve<GetSeasonsQuery, GetSeasons>("VideoLibrary.GetSeasons", {
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
    getSongById: (id: number) =>
      retrieve<GetSongQuery, GetSong>("AudioLibrary.GetSongDetails", {
        properties: [
          "album",
          "albumartist",
          "artist",
          "art",
          "disc",
          "duration",
          "track",
          "title",
          "year",
        ],
        songid: id,
      }),
    getSongs: (page = 1) =>
      retrieve<GetSongsQuery, SongsPaged>("AudioLibrary.GetSongs", {
        limits: getPageLimits(page),
        properties: ["disc", "duration", "track", "title", "year"],
        sort: { method: "track", order: "ascending" },
      }),
    getSongsByAlbum: ({ album, artist, year }) =>
      retrieve<GetSongsQuery, SongsPaged>("AudioLibrary.GetSongs", {
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
      retrieve<GetTVShowDetailsQuery, GetTVShow>(
        "VideoLibrary.GetTVShowDetails",
        {
          properties: [
            "art",
            "episode",
            "season",
            "title",
            "watchedepisodes",
            "year",
          ],
          tvshowid: id,
        },
      ),
    getTVShowsByGenre: ({ genre, page }) =>
      retrieve<GetTVShowsQuery, GetTVShows>("VideoLibrary.GetTVShows", {
        filter: { field: "genre", operator: "is", value: genre },
        limits: getPageLimits(page),
        properties: ["art", "episode", "title", "watchedepisodes", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getTVShowGenres: (page = 1) =>
      retrieve<GetVideoGenresQuery, VideoGenresPaged>(
        "VideoLibrary.GetGenres",
        {
          limits: getPageLimits(page),
          properties: ["thumbnail"],
          sort: { method: "label", order: "ascending" },
          type: "tvshow",
        },
      ),
    getTVShows: (page = 1) =>
      retrieve<GetTVShowsQuery, GetTVShows>("VideoLibrary.GetTVShows", {
        limits: getPageLimits(page),
        properties: ["art", "episode", "title", "watchedepisodes", "year"],
        sort: { method: "title", order: "ascending" },
      }),
    getTVShowsInProgress: () =>
      retrieve<GetTVShowsQuery, GetTVShows>(
        "VideoLibrary.GetInProgressTVShows",
        {
          properties: ["art", "episode", "title", "watchedepisodes", "year"],
          sort: { method: "title", order: "ascending" },
        },
      ),
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
