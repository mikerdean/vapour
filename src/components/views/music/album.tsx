import { Show, createMemo } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { useGetAlbumQuery, useGetSongsQuery } from "../../../socket/query";
import type { AudioDetailsAlbum } from "../../../socket/types";
import { getVideoDuration } from "../../../utils/duration";
import { albumValidator } from "../../../validators";
import DefinitionList from "../../core/definitionList";
import Heading from "../../core/heading";
import { ThumbnailType } from "../../core/thumbnail.types";
import type { AlbumComponent } from "./album.types";
import SongList from "./songList";
import useGridData from "../../grid/useGridData";
import { skipToken } from "../../../socket/query/types";
import Rating from "../../core/rating";
import ItemLayout from "../../layout/itemLayout";

const Album: AlbumComponent = () => {
  const params = useTypedParams(albumValidator);

  const [albumData] = useGetAlbumQuery(() => ({
    albumid: params().albumId,
  }));

  const [songData] = useGetSongsQuery(() => {
    const result = albumData();
    if (!result) {
      return skipToken;
    }

    const { artist, title, year } = result.albumdetails;

    return {
      filter: {
        and: [
          {
            field: "albumartist",
            operator: "is",
            value: artist?.toString() || "",
          },
          { field: "album", operator: "is", value: title || "" },
          { field: "year", operator: "is", value: (year || 0).toString() },
        ],
      },
      sort: { method: "year", order: "ascending" },
    };
  });

  const album = createMemo<AudioDetailsAlbum | undefined>(() => {
    const result = albumData();
    if (!result) {
      return;
    }

    return result.albumdetails;
  });

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
    <Show when={album()} keyed>
      {(album) => (
        <ItemLayout
          title={`${album.title}${album.year ? ` (${album.year})` : ""}`}
          thumbnailUrl={album.thumbnail}
          thumbnailType={ThumbnailType.Album}
        >
          <DefinitionList
            label="Album details"
            each={[
              { header: "Artist", description: album.artist || "Unknown" },
              {
                header: "Duration",
                description: getVideoDuration(duration()) || "Unknown",
              },
              { header: "Genre", description: album.genre || "Unknown" },
              { header: "Year", description: album.year || "Unknown" },
            ]}
          />
          <Show when={album.description}>
            <p class="mb-3">{album.description}</p>
          </Show>
          <Show when={album.rating}>
            <div class="mb-3">
              <Heading level={2}>Rating</Heading>
              <Rating value={album.rating} />
            </div>
          </Show>
          <div class="mt-5">
            <Heading level={2}>Tracks</Heading>
            <SongList songs={songs()} />
          </div>
        </ItemLayout>
      )}
    </Show>
  );
};

export default Album;
