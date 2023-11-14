import { useGetRecentlyAddedAlbumsQuery } from "../../../socket/query";
import { ThumbnailType } from "../../core/thumbnail.types";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import type { RecentAlbumsComponent } from "./recentAlbums.types";

const RecentAlbums: RecentAlbumsComponent = () => {
  const [recentAlbums] = useGetRecentlyAddedAlbumsQuery();

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
