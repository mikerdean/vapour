import { GetMovies, GetMoviesQuery } from "../types/video";
import { createQueryHook } from "./utils";

export const useGetMoviesQuery = createQueryHook<GetMoviesQuery, GetMovies>(
  "VideoLibrary.GetMovies",
  {
    properties: [
      "art",
      "playcount",
      "runtime",
      "set",
      "title",
      "thumbnail",
      "year",
    ],
    sort: { method: "title", order: "ascending" },
  }
);

export const useGetRecentMoviesQuery = createQueryHook<
  GetMoviesQuery,
  GetMovies
>("VideoLibrary.GetRecentlyAddedMovies", {
  properties: [
    "art",
    "playcount",
    "runtime",
    "set",
    "title",
    "thumbnail",
    "year",
  ],
});
