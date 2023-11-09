import type {
  GetMovie,
  GetMovieQuery,
  GetMovieSet,
  GetMovieSetDetailsQuery,
  GetMovieSets,
  GetMovieSetsQuery,
  GetMovies,
  GetMoviesQuery,
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
      "genre",
      "playcount",
      "plot",
      "runtime",
      "set",
      "title",
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

export const useGetInProgressTVShowsQuery = createQueryHook<
  GetTVShowsQuery,
  GetTVShows
>("VideoLibrary.GetInProgressTVShows", {
  properties: ["art", "episode", "title", "watchedepisodes", "year"],
  sort: { method: "title", order: "ascending" },
});
