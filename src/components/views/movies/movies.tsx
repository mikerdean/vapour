import { useGetMoviesQuery } from "../../../state/socket/commands/video";
import { getTextDuration } from "../../../utils/duration";
import { ThumbnailType } from "../../core/thumbnail/types";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import Pagination from "../../pagination";
import useSearchPagination from "../../pagination/useSearchPagination";
import { MoviesComponent } from "./types";

const Movies: MoviesComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [movieData] = useGetMoviesQuery(query);

  const [movies, total] = useGridData(
    movieData,
    (data) => data.movies,
    (movie) => ({
      ...movie,
      id: movie.movieid,
      thumbnail: movie.art?.poster,
    })
  );

  return (
    <div class="p-3">
      <h1 class="sr-only">Movies</h1>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
        pageSize={pageSize}
        total={total()}
      />
      <Grid each={movies()} thumbnailType={ThumbnailType.Movie}>
        {(movie) => (
          <GridCard
            title={movie.title}
            items={[getTextDuration(movie.runtime || 0), movie.year]}
          />
        )}
      </Grid>
    </div>
  );
};

export default Movies;
