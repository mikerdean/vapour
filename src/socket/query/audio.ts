import type {
  AlbumsPaged,
  ArtistsPaged,
  GetAlbum,
  GetAlbumQuery,
  GetAlbumsQuery,
  GetArtist,
  GetArtistQuery,
  GetArtistsQuery,
  GetMusicGenresQuery,
  GetSongsQuery,
  MusicGenresPaged,
  RecentlyAddedAlbumsQuery,
  SongsPaged,
} from "../types";
import { createQueryHook } from "./utils";

export const useGetAlbumsQuery = createQueryHook<GetAlbumsQuery, AlbumsPaged>(
  "AudioLibrary.GetAlbums",
  {
    properties: ["artist", "genre", "thumbnail", "title", "year"],
    sort: { method: "title", order: "ascending" },
  },
);

export const useGetAlbumQuery = createQueryHook<GetAlbumQuery, GetAlbum>(
  "AudioLibrary.GetAlbumDetails",
  {
    albumid: 0,
    properties: [
      "artist",
      "description",
      "genre",
      "rating",
      "thumbnail",
      "title",
      "year",
    ],
  },
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
  },
);

export const useGetMusicGenresQuery = createQueryHook<
  GetMusicGenresQuery,
  MusicGenresPaged
>("AudioLibrary.GetGenres", {
  properties: ["thumbnail"],
  sort: { method: "label", order: "ascending" },
});

export const useGetSongsQuery = createQueryHook<GetSongsQuery, SongsPaged>(
  "AudioLibrary.GetSongs",
  {
    properties: ["disc", "duration", "track", "title", "year"],
    sort: { method: "track" },
  },
);

export const useGetRecentlyAddedAlbumsQuery = createQueryHook<
  RecentlyAddedAlbumsQuery,
  AlbumsPaged
>("AudioLibrary.GetRecentlyAddedAlbums", {
  properties: ["artist", "genre", "thumbnail", "title", "year"],
});
