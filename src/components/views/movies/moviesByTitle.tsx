import { useGetMoviesQuery } from "../../../socket/query";
import { getVideoDuration } from "../../../utils/duration";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import useSearchPagination from "../../pagination/useSearchPagination";
import type { MoviesByTitleComponent } from "./moviesByTitle.types";

const MoviesByTitle: MoviesByTitleComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [movieData] = useGetMoviesQuery(query);

  const [movies, total] = useGridData(
    movieData,
    (data) => data.movies,
    (movie) => ({
      ...movie,
      id: movie.movieid,
      played: movie.playcount !== undefined && movie.playcount > 0,
      thumbnail: movie.art?.poster,
    }),
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
      <Grid each={movies()} thumbnailType={ThumbnailType.Movie}>
        {(movie) => (
          <GridCard
            title={movie.title}
            items={[getVideoDuration(movie.runtime || 0), movie.year]}
          />
        )}
      </Grid>
    </>
  );
};

export default MoviesByTitle;