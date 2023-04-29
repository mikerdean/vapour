import { useGetAlbumsQuery } from "../../../../socket/query";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import useGridData from "../../../grid/useGridData";
import Pagination from "../../../pagination";
import useSearchPagination from "../../../pagination/useSearchPagination";
import type { AlbumsComponent } from "./types";

const Albums: AlbumsComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [albumData] = useGetAlbumsQuery(query);

  const [albums, total] = useGridData(
    albumData,
    (data) => data.albums,
    (album) => ({ ...album, id: album.albumid })
  );

  return (
    <>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => {
          setSearchParams({ page });
          window.scrollTo({ top: 0 });
        }}
        pageSize={pageSize}
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
