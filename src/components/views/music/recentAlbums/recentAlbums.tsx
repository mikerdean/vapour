import { useGetRecentlyAddedAlbumsQuery } from "../../../../state/socket/commands";
import { AudioDetailsAlbum } from "../../../../state/socket/types";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import { GridItem } from "../../../grid/types";
import { RecentAlbumsComponent } from "./types";

const RecentAlbums: RecentAlbumsComponent = () => {
  return (
    <Grid
      hook={useGetRecentlyAddedAlbumsQuery}
      selectFromResult={(result) =>
        result.albums.map((album) => ({ ...album, id: album.albumid }))
      }
      thumbnailType={ThumbnailType.Album}
    >
      {(album: AudioDetailsAlbum & GridItem) => (
        <GridCard title={album.title} items={[album.artist, album.year]} />
      )}
    </Grid>
  );
};

export default RecentAlbums;
