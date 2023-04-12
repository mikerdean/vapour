import { Show, createMemo } from "solid-js";

import useTypedParams from "../../../../routes/useTypedParams";
import { useGetAlbumQuery } from "../../../../state/socket/commands";
import type { AudioDetailsAlbum } from "../../../../state/socket/types";
import { getSongDuration } from "../../../../utils/duration";
import { albumValidator } from "../../../../validators";
import DefinitionList from "../../../core/definitionList";
import Heading from "../../../core/heading";
import Thumbnail from "../../../core/thumbnail";
import { ThumbnailType } from "../../../core/thumbnail/types";
import AlbumSongs from "../albumSongs";
import type { AlbumComponent } from "./types";

const Album: AlbumComponent = () => {
  const params = useTypedParams(albumValidator);

  const [albumData] = useGetAlbumQuery(() => ({
    albumid: params().albumId,
  }));

  const album = createMemo<AudioDetailsAlbum | undefined>(() => {
    const result = albumData();
    if (!result) {
      return;
    }

    return result.albumdetails;
  });

  return (
    <Show when={album()} keyed>
      {(album) => (
        <div>
          <Heading level={1}>
            {album.title}
            {album.year && ` (${album.year})`}
          </Heading>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            {album.thumbnail && (
              <div>
                <Thumbnail
                  type={ThumbnailType.Album}
                  uri={album.thumbnail}
                  alt=""
                />
              </div>
            )}
            <div>
              <DefinitionList
                label="Album details"
                each={[
                  { header: "Artist", description: album.artist || "Unknown" },
                  {
                    header: "Duration",
                    description: album.albumduration
                      ? getSongDuration(album.albumduration)
                      : "Unknown",
                  },
                  { header: "Genre", description: album.genre || "Unknown" },
                  { header: "Year", description: album.year || "Unknown" },
                ]}
              />
              {album.description && <p class="mt-3">{album.description}</p>}
            </div>
          </div>
          <Heading level={2}>Tracks</Heading>
          <AlbumSongs
            artist={album.artist?.toString() || ""}
            album={album.title || ""}
            year={album.year || 0}
          />
        </div>
      )}
    </Show>
  );
};

export default Album;
