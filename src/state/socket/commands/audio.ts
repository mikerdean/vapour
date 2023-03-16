import {
  AlbumsPaged,
  ArtistsPaged,
  GenresPaged,
  GetAlbum,
  GetAlbumQuery,
  GetAlbumsQuery,
  GetArtist,
  GetArtistQuery,
  GetArtistsQuery,
  GetGenresQuery,
  GetSongsQuery,
  RecentlyAddedAlbumsQuery,
  SongsPaged,
} from "../types";
import { createQueryHook } from "./utils";

export const useGetAlbumsQuery = createQueryHook<GetAlbumsQuery, AlbumsPaged>(
  "AudioLibrary.GetAlbums",
  {
    properties: ["artist", "genre", "thumbnail", "title", "year"],
    sort: { method: "title", order: "ascending" },
  }
);

export const useGetAlbumQuery = createQueryHook<GetAlbumQuery, GetAlbum>(
  "AudioLibrary.GetAlbumDetails",
  {
    albumid: 0,
    properties: [
      "artist",
      "description",
      "genre",
      "thumbnail",
      "title",
      "year",
    ],
  }
);

export const useGetArtistsQuery = createQueryHook<
  GetArtistsQuery,
  ArtistsPaged
>("AudioLibrary.GetArtists", {
  albumartistsonly: true,
  properties: ["songgenres", "thumbnail"],
  sort: { method: "label", order: "ascending", ignorearticle: true },
});

export const useGetArtistQuery = createQueryHook<GetArtistQuery, GetArtist>(
  "AudioLibrary.GetArtistDetails",
  {
    artistid: 0,
    properties: ["description", "thumbnail"],
  }
);

export const useGetGenresQuery = createQueryHook<GetGenresQuery, GenresPaged>(
  "AudioLibrary.GetGenres",
  {
    properties: ["thumbnail"],
    sort: { method: "label", order: "ascending" },
  }
);

export const useGetSongsQuery = createQueryHook<GetSongsQuery, SongsPaged>(
  "AudioLibrary.GetSongs",
  {
    properties: ["disc", "duration", "track", "title", "year"],
    sort: { method: "track" },
  }
);

export const useGetRecentlyAddedAlbumsQuery = createQueryHook<
  RecentlyAddedAlbumsQuery,
  AlbumsPaged
>("AudioLibrary.GetRecentlyAddedAlbums", {
  properties: ["artist", "genre", "thumbnail", "title", "year"],
});
