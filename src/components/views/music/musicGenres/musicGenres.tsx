import { useGetMusicGenresQuery } from "../../../../socket/query";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import useGridData from "../../../grid/useGridData";
import Pagination from "../../../pagination";
import useSearchPagination from "../../../pagination/useSearchPagination";
import type { MusicGenresComponent } from "./types";

const MusicGenres: MusicGenresComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [genreData] = useGetMusicGenresQuery(query);

  const [genres, total] = useGridData(
    genreData,
    (data) => data.genres,
    (genre) => ({ ...genre, id: encodeURIComponent(genre.label) }),
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
      <Grid each={genres()} thumbnailType={ThumbnailType.MusicGenre}>
        {(genre) => <GridCard title={genre.label} />}
      </Grid>
    </>
  );
};

export default MusicGenres;
