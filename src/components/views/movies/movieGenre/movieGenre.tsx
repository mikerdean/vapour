import { createMemo } from "solid-js";

import useTypedParams from "../../../../routes/useTypedParams";
import { useGetMoviesQuery } from "../../../../socket/commands";
import { getVideoDuration } from "../../../../utils/duration";
import { genreValidator } from "../../../../validators";
import Heading from "../../../core/heading";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import useGridData from "../../../grid/useGridData";
import Pagination from "../../../pagination";
import useSearchPagination from "../../../pagination/useSearchPagination";
import type { MovieGenreComponent } from "./types";

const MovieGenre: MovieGenreComponent = () => {
  const pageSize = 100;

  const params = useTypedParams(genreValidator);

  const decodedGenre = createMemo(() => {
    const genre = params().genre;
    if (!genre) {
      return genre;
    }

    return decodeURIComponent(genre);
  });

  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [movieData] = useGetMoviesQuery(() => ({
    filter: {
      field: "genre",
      operator: "is",
      value: decodedGenre(),
    },
    ...query(),
  }));

  const [movies, total] = useGridData(
    movieData,
    (data) => data.movies,
    (movie) => ({
      ...movie,
      id: movie.movieid,
      played: (movie.playcount || 0) > 0,
      thumbnail: movie.art?.poster || movie.thumbnail,
    })
  );

  return (
    <>
      <Heading level={1}>{decodedGenre()}</Heading>
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
            items={[getVideoDuration(movie.runtime || 0), movie.year]}
          />
        )}
      </Grid>
    </>
  );
};

export default MovieGenre;
