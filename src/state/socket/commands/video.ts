import { GetMovies, GetMoviesQuery } from "../types/video";
import { createQueryHook } from "./utils";

export const useGetMoviesQuery = createQueryHook<GetMoviesQuery, GetMovies>(
  "VideoLibrary.GetMovies",
  {
    properties: ["playcount", "set", "title", "thumbnail", "year"],
    sort: { method: "title", order: "ascending" },
  }
);
