import { createResource } from "solid-js";

import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import type { RecentAlbumsComponent } from "./recentAlbums.types";

const RecentAlbums: RecentAlbumsComponent = () => {
  const [, { getRecentlyAddedAlbums }] = useSocket();
  const [recentAlbums] = createResource(getRecentlyAddedAlbums);

  const [albums] = useGridData(
    recentAlbums,
    (data) => data.albums,
    (album) => ({ ...album, id: album.albumid }),
  );

  return (
    <Grid each={albums()} thumbnailType={ThumbnailType.Album}>
      {(album) => (
        <GridCard title={album.title} items={[album.artist, album.year]} />
      )}
    </Grid>
  );
};

export default RecentAlbums;
