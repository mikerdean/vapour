import { Show, createMemo } from "solid-js";

import useTypedParams from "../../../../routes/useTypedParams";
import { useGetAlbumQuery } from "../../../../state/socket/commands";
import type { AudioDetailsAlbum } from "../../../../state/socket/types";
import { albumValidator } from "../../../../validators";
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
          {album.thumbnail && (
            <div class="mb-3">
              <Thumbnail
                type={ThumbnailType.Album}
                uri={album.thumbnail}
                alt=""
              />
            </div>
          )}
          {album.description && <p class="mb-3">{album.description}</p>}
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
