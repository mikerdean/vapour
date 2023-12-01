import type {
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
  GetSeason,
  GetSeasonDetailsQuery,
  GetSeasons,
  GetSeasonsQuery,
  GetTVShow,
  GetTVShowDetailsQuery,
  GetTVShows,
  GetTVShowsQuery,
  GetVideoGenresQuery,
  VideoGenresPaged,
} from "../types/video";
import { createQueryHook } from "./utils";

export const useGetMoviesQuery = createQueryHook<GetMoviesQuery, GetMovies>(
  "VideoLibrary.GetMovies",
  {
    properties: ["art", "playcount", "runtime", "set", "title", "year"],
    sort: { method: "title", order: "ascending" },
  },
);

export const useGetRecentMoviesQuery = createQueryHook<
  GetMoviesQuery,
  GetMovies
>("VideoLibrary.GetRecentlyAddedMovies", {
  properties: ["art", "playcount", "runtime", "set", "title", "year"],
});

export const useGetMovieSetsQuery = createQueryHook<
  GetMovieSetsQuery,
  GetMovieSets
>("VideoLibrary.GetMovieSets", {
  properties: ["art", "playcount", "title"],
  sort: { method: "title", order: "ascending" },
});

export const useGetMovieGenresQuery = createQueryHook<
  GetVideoGenresQuery,
  VideoGenresPaged
>("VideoLibrary.GetGenres", {
  properties: ["thumbnail"],
  sort: { method: "label", order: "ascending" },
  type: "movie",
});

export const useGetMovieDetailsQuery = createQueryHook<GetMovieQuery, GetMovie>(
  "VideoLibrary.GetMovieDetails",
  {
    movieid: 0,
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
  },
);

export const useGetMovieSetDetailsQuery = createQueryHook<
  GetMovieSetDetailsQuery,
  GetMovieSet
>("VideoLibrary.GetMovieSetDetails", {
  movies: {
    properties: ["art", "playcount", "runtime", "set", "title", "year"],
    sort: { method: "year", order: "ascending" },
  },
  properties: ["art", "playcount", "title"],
  setid: 0,
});

export const useGetTVShowsQuery = createQueryHook<GetTVShowsQuery, GetTVShows>(
  "VideoLibrary.GetTVShows",
  {
    properties: ["art", "episode", "title", "watchedepisodes", "year"],
    sort: { method: "title", order: "ascending" },
  },
);

export const useGetTVShowDetailsQuery = createQueryHook<
  GetTVShowDetailsQuery,
  GetTVShow
>("VideoLibrary.GetTVShowDetails", {
  properties: ["art", "episode", "season", "title", "watchedepisodes", "year"],
  tvshowid: 0,
});

export const useGetInProgressTVShowsQuery = createQueryHook<
  GetTVShowsQuery,
  GetTVShows
>("VideoLibrary.GetInProgressTVShows", {
  properties: ["art", "episode", "title", "watchedepisodes", "year"],
  sort: { method: "title", order: "ascending" },
});

export const useGetSeasonsQuery = createQueryHook<GetSeasonsQuery, GetSeasons>(
  "VideoLibrary.GetSeasons",
  {
    properties: ["art", "episode", "title", "userrating", "watchedepisodes"],
    sort: { method: "title", order: "ascending" },
    tvshowid: 0,
  },
);

export const useGetSeasonDetailsQuery = createQueryHook<
  GetSeasonDetailsQuery,
  GetSeason
>("VideoLibrary.GetSeasonDetails", {
  properties: [
    "art",
    "episode",
    "season",
    "title",
    "tvshowid",
    "userrating",
    "watchedepisodes",
  ],
  seasonid: 0,
});

export const useGetEpisodesQuery = createQueryHook<
  GetEpisodesQuery,
  GetEpisodes
>("VideoLibrary.GetEpisodes", {
  properties: [
    "art",
    "episode",
    "firstaired",
    "playcount",
    "plot",
    "rating",
    "runtime",
    "season",
    "title",
    "tvshowid",
    "userrating",
  ],
  sort: { method: "episode", order: "ascending" },
  season: 0,
  tvshowid: 0,
});
