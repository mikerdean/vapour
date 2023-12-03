import { createResource } from "solid-js";

import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import type { ArtistAlbumsComponent } from "./artistAlbums.types";

const ArtistAlbums: ArtistAlbumsComponent = (props) => {
  const [, { getAlbumsByAlbumArtist }] = useSocket();

  const [albumData] = createResource(
    () => props.artist,
    getAlbumsByAlbumArtist,
  );

  const [albums] = useGridData(
    albumData,
    (data) => data.albums,
    (album) => ({ ...album, id: album.albumid }),
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
