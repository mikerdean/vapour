import { createMemo, Show } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { useGetMovieDetailsQuery } from "../../../socket/query";
import type { VideoDetailsMovie } from "../../../socket/types";
import { getVideoDuration } from "../../../utils/duration";
import { movieValidator } from "../../../validators";
import DefinitionList from "../../core/definitionList";
import Heading from "../../core/heading";
import Rating from "../../core/rating";
import { ThumbnailType } from "../../images/thumbnail.types";
import ItemLayout from "../../layout/itemLayout";
import Cast from "./cast";
import type { MovieComponent } from "./movie.types";

const Movie: MovieComponent = () => {
  const params = useTypedParams(movieValidator);

  const [movieData] = useGetMovieDetailsQuery(() => ({
    movieid: params().movieId,
  }));

  const movie = createMemo<VideoDetailsMovie | undefined>(() => {
    const result = movieData();
    if (!result) {
      return;
    }

    return result.moviedetails;
  });

  const joinArray = (
    arr: string[] | undefined,
    separator = ", ",
    unknownText = "Unknown",
  ) => (arr ? arr.join(separator) : unknownText);

  return (
    <Show when={movie()} keyed>
      {(movie) => (
        <ItemLayout
          backgroundArtUrl={movie.art?.fanart}
          thumbnailType={ThumbnailType.Movie}
          thumbnailUrl={movie.art?.poster}
          title={`${movie.title}${movie.year ? ` (${movie.year})` : ""}`}
        >
          <DefinitionList
            label="Movie details"
            each={[
              {
                header: "Runtime",
                description: movie.runtime
                  ? getVideoDuration(movie.runtime)
                  : "Unknown",
              },
              {
                header: "Genre",
                description: joinArray(movie.genre),
              },
              {
                header: "Director",
                description: joinArray(movie.director),
              },
              {
                header: "Writer",
                description: joinArray(movie.writer),
              },
              {
                header: "Status",
                description:
                  movie.playcount && movie.playcount > 0
                    ? "Watched"
                    : "Unwatched",
              },
              { header: "Year", description: movie.year || "Unknown" },
            ]}
          />
          <Show when={movie.plot}>
            <p class="mb-3">{movie.plot}</p>
          </Show>
          <Show when={movie.rating}>
            <div class="mb-3">
              <Heading level={2}>Rating</Heading>
              <Rating value={movie.rating} />
            </div>
          </Show>
          <Show when={movie.cast && movie.cast.length > 0}>
            <Heading level={2}>Cast</Heading>
            <Cast cast={movie.cast || []} />
          </Show>
        </ItemLayout>
      )}
    </Show>
  );
};

export default Movie;
