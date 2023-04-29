import type {
  GetMovie,
  GetMovieQuery,
  GetMovieSets,
  GetMovieSetsQuery,
  GetMovies,
  GetMoviesQuery,
  GetVideoGenresQuery,
  VideoGenresPaged,
} from "../types/video";
import { createQueryHook } from "./utils";

export const useGetMoviesQuery = createQueryHook<GetMoviesQuery, GetMovies>(
  "VideoLibrary.GetMovies",
  {
    properties: ["art", "playcount", "runtime", "set", "title", "year"],
    sort: { method: "title", order: "ascending" },
  }
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
      "playcount",
      "plot",
      "runtime",
      "set",
      "title",
      "year",
    ],
  }
);