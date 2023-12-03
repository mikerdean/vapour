import { createResource } from "solid-js";

import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import type { AlbumsComponent } from "./albums.types";

const Albums: AlbumsComponent = () => {
  const [, { getAlbums }] = useSocket();
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const [albumData] = createResource(() => searchParams().page, getAlbums);

  const [albums, total] = useGridData(
    albumData,
    (data) => data.albums,
    (album) => ({ ...album, id: album.albumid }),
  );

  return (
    <>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => {
          setSearchParams({ page });
          window.scrollTo({ top: 0 });
        }}
        total={total()}
      />
      <Grid each={albums()} thumbnailType={ThumbnailType.Album}>
        {(album) => (
          <GridCard title={album.title} items={[album.artist, album.year]} />
        )}
      </Grid>
    </>
  );
};

export default Albums;
