import { createMemo, Show } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { useGetMovieSetDetailsQuery } from "../../../socket/query";
import { getVideoDuration } from "../../../utils/duration";
import { movieSetValidator } from "../../../validators";
import Heading from "../../core/heading";
import { ThumbnailType } from "../../core/thumbnail.types";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import type { MovieSetComponent } from "./movieSet.types";

const MovieSet: MovieSetComponent = () => {
  const params = useTypedParams(movieSetValidator);

  const [setData] = useGetMovieSetDetailsQuery(() => ({
    setid: params().setId,
  }));

  const movieSet = createMemo(() => {
    const result = setData();
    if (!result) {
      return undefined;
    }

    return {
      ...result.setdetails,
      movies: result.setdetails.movies.map((movie) => ({
        ...movie,
        id: movie.movieid,
        played: movie.playcount !== undefined && movie.playcount > 0,
        thumbnail: movie.art?.poster,
      })),
    };
  });

  return (
    <Show when={movieSet()} keyed>
      {(movieSet) => (
        <>
          <Heading level={1}>{movieSet.title}</Heading>
          <Grid each={movieSet.movies} thumbnailType={ThumbnailType.Movie}>
            {(movie) => (
              <GridCard
                title={movie.title}
                items={[getVideoDuration(movie.runtime || 0), movie.year]}
              />
            )}
          </Grid>
        </>
      )}
    </Show>
  );
};

export default MovieSet;
