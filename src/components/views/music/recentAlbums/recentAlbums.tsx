import { createMemo } from "solid-js";

import { useGetRecentlyAddedAlbumsQuery } from "../../../../state/socket/commands";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import { RecentAlbumsComponent } from "./types";

const RecentAlbums: RecentAlbumsComponent = () => {
  const [recentAlbums] = useGetRecentlyAddedAlbumsQuery();

  const albums = createMemo(() => {
    const data = recentAlbums();
    if (!data) {
      return [];
    }

    return data.albums.map((album) => ({ ...album, id: album.albumid }));
  });

  return (
    <Grid each={albums()} thumbnailType={ThumbnailType.Album}>
      {(album) => (
        <GridCard title={album.title} items={[album.artist, album.year]} />
      )}
    </Grid>
  );
};

export default RecentAlbums;
