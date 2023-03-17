import { useGetAlbumsQuery } from "../../../../state/socket/commands";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import useGridData from "../../../grid/useGridData";
import { ArtistAlbumsComponent } from "./types";

const ArtistAlbums: ArtistAlbumsComponent = (props) => {
  const [albumData] = useGetAlbumsQuery(() => ({
    filter: { field: "albumartist", operator: "is", value: props.artist },
    sort: { method: "year", order: "ascending" },
  }));

  const [albums] = useGridData(
    albumData,
    (data) => data.albums,
    (album) => ({ ...album, id: album.albumid })
  );

  return (
    <Grid each={albums()} thumbnailType={ThumbnailType.Album}>
      {(album) => (
        <GridCard title={album.title} items={[album.genre, album.year]} />
      )}
    </Grid>
  );
};

export default ArtistAlbums;