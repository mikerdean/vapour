import { useGetMovieGenresQuery } from "../../../../state/socket/commands";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import useGridData from "../../../grid/useGridData";
import Pagination from "../../../pagination";
import useSearchPagination from "../../../pagination/useSearchPagination";
import type { MovieGenresComponent } from "./types";

const MovieGenres: MovieGenresComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [genreData] = useGetMovieGenresQuery(query);

  const [genres, total] = useGridData(
    genreData,
    (data) => data.genres,
    (genre) => ({ ...genre, id: encodeURIComponent(genre.label) })
  );

  return (
    <>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
        pageSize={pageSize}
        total={total()}
      />
      <Grid each={genres()} thumbnailType={ThumbnailType.MovieGenre}>
        {(genre) => <GridCard title={genre.label} />}
      </Grid>
    </>
  );
};

export default MovieGenres;