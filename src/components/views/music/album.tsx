import { createMemo, createResource, Show } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { getVideoDuration } from "../../../utils/duration";
import { albumValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import DefinitionList from "../../core/definitionList";
import Heading from "../../core/heading";
import Rating from "../../core/rating";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import ItemLayout from "../../layout/itemLayout";
import type { AlbumComponent } from "./album.types";
import SongList from "./songList";

const Album: AlbumComponent = () => {
  const params = useTypedParams(albumValidator);
  const [, { getAlbumById, getSongsByAlbum }] = useSocket();

  const [albumData] = createResource(() => params().albumId, getAlbumById);

  const [songData] = createResource(() => {
    const result = albumData();
    if (!result) {
      return null;
    }

    const { artist, title, year } = result.albumdetails;
    return { album: title, artist, year };
  }, getSongsByAlbum);

  const [songs] = useGridData(
    songData,
    (data) => data.songs,
    (song) => ({ ...song, id: song.songid }),
  );

  const duration = createMemo<number>(() => {
    const results = songs();
    if (!results) {
      return -1;
    }

    return results.reduce((total, song) => total + (song.duration || 0), 0);
  });

  return (
    <ItemLayout
      backgroundArtUrl={albumData()?.albumdetails.art?.fanart}
      title={`${albumData()?.albumdetails.title}${
        albumData()?.albumdetails.year
          ? ` (${albumData()?.albumdetails.year})`
          : ""
      }`}
      thumbnailUrl={albumData()?.albumdetails.thumbnail}
      thumbnailType={ThumbnailType.Album}
    >
      <DefinitionList
        label="Album details"
        each={[
          {
            header: "Artist",
            description: albumData()?.albumdetails.artist || "Unknown",
          },
          {
            header: "Duration",
            description: getVideoDuration(duration()) || "Unknown",
          },
          {
            header: "Genre",
            description: albumData()?.albumdetails.genre || "Unknown",
          },
          {
            header: "Year",
            description: albumData()?.albumdetails.year || "Unknown",
          },
        ]}
      />
      <Show when={albumData()?.albumdetails.description}>
        <p class="mb-3">{albumData()?.albumdetails.description}</p>
      </Show>
      <Show when={albumData()?.albumdetails.rating}>
        <div class="mb-3">
          <Heading level={2}>Rating</Heading>
          <Rating value={albumData()?.albumdetails.rating} />
        </div>
      </Show>
      <div class="mt-5">
        <Heading level={2}>Tracks</Heading>
        <SongList songs={songs()} />
      </div>
    </ItemLayout>
  );
};

export default Album;
