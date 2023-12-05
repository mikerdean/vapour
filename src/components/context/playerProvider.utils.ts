import type { GetEpisode, GetMovie, GetSong } from "../../socket/types";
import type { NotificationItem } from "../../socket/types/notifications";
import { getVideoDuration } from "../../utils/duration";
import type { SocketMethods } from "../context/socketProvider.types";
import { ThumbnailType } from "../images/thumbnail.types";
import type { NowPlayingItem } from "./playerProvider.types";

const convertMovieToPlayingItem = (result: GetMovie): NowPlayingItem => {
  const movie = result.moviedetails;

  return {
    backgroundUrl: movie.art?.fanart,
    id: movie.movieid,
    metadata: [
      { title: "Duration", value: getVideoDuration(movie.runtime || 0) },
      { title: "Year", value: movie.year?.toString() },
    ],
    title: movie.title || "Unknown movie",
    thumbnailUrl: movie.art?.poster,
    type: ThumbnailType.Movie,
  };
};

const convertEpisodeToPlayingItem = (result: GetEpisode): NowPlayingItem => {
  const episode = result.episodedetails;

  return {
    backgroundUrl: episode.art?.fanart,
    id: episode.episodeid,
    metadata: [
      { title: "TV Show title", value: episode.showtitle },
      {
        title: "Season",
        value: episode.season ? `Season ${episode.season}` : undefined,
      },
    ],
    title: episode.title || "Unknown episode",
    thumbnailUrl: episode.art?.thumb,
    type: ThumbnailType.Episode,
  };
};

const convertSongToPlayingItem = (result: GetSong): NowPlayingItem => {
  const song = result.songdetails;

  return {
    backgroundUrl: song.art?.fanart,
    id: song.songid,
    metadata: [
      { title: "Album", value: song.album },
      { title: "Artist", value: song.artist?.toString() },
    ],
    title: song.title || "Unknown song",
    thumbnailUrl: song.art?.thumb || song.art?.["album.thumb"],
    type: ThumbnailType.Song,
  };
};

export const createPlayingItem = async (
  {
    getMovieById,
    getEpisodeById,
    getSongById,
  }: Pick<SocketMethods, "getMovieById" | "getEpisodeById" | "getSongById">,
  item: NotificationItem,
): Promise<NowPlayingItem | undefined> => {
  switch (item.type) {
    case "movie":
      return convertMovieToPlayingItem(await getMovieById(item.id));

    case "episode":
      return convertEpisodeToPlayingItem(await getEpisodeById(item.id));

    case "song":
      return convertSongToPlayingItem(await getSongById(item.id));

    default:
      return;
  }
};
