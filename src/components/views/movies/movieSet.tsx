import { createMemo, createResource } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { getVideoDuration } from "../../../utils/duration";
import { movieSetValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Heading from "../../core/heading";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import Fanart from "../../images/fanart";
import { ThumbnailType } from "../../images/thumbnail.types";
import type { MovieSetComponent } from "./movieSet.types";

const MovieSet: MovieSetComponent = () => {
  const params = useTypedParams(movieSetValidator);
  const [, { getMovieSetById }] = useSocket();

  const [setData] = createResource(() => params().setId, getMovieSetById);

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
    <>
      <Fanart uri={movieSet()?.art?.fanart} />
      <Heading level={1}>{movieSet()?.title}</Heading>
      <Grid each={movieSet()?.movies || []} thumbnailType={ThumbnailType.Movie}>
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

export default MovieSet;
