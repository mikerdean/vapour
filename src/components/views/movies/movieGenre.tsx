import { createMemo, createResource } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { getVideoDuration } from "../../../utils/duration";
import { genreValidator, pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Heading from "../../core/heading";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import type { MovieGenreComponent } from "./movieGenre.types";

const MovieGenre: MovieGenreComponent = () => {
  const [, { getMoviesByGenre }] = useSocket();
  const params = useTypedParams(genreValidator);
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const decodedGenre = createMemo(() => {
    const genre = params().genre;
    if (!genre) {
      return genre;
    }

    return decodeURIComponent(genre);
  });

  const [movieData] = createResource(
    () => ({
      genre: decodedGenre(),
      page: searchParams().page,
    }),
    getMoviesByGenre,
  );

  const [movies, total] = useGridData(
    movieData,
    (data) => data.movies,
    (movie) => ({
      ...movie,
      id: movie.movieid,
      played: (movie.playcount || 0) > 0,
      thumbnail: movie.art?.poster || movie.thumbnail,
    }),
  );

  return (
    <>
      <Heading level={1}>{decodedGenre()}</Heading>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
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
