import { For, Show, createMemo } from "solid-js";

import useTypedParams from "../../../../routes/useTypedParams";
import { useGetMovieDetailsQuery } from "../../../../state/socket/commands";
import type { VideoDetailsMovie } from "../../../../state/socket/types";
import { getVideoDuration } from "../../../../utils/duration";
import { movieValidator } from "../../../../validators";
import DefinitionList from "../../../core/definitionList";
import Heading from "../../../core/heading";
import Thumbnail from "../../../core/thumbnail";
import { ThumbnailType } from "../../../core/thumbnail/types";
import type { MovieComponent } from "./types";

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

    const movie = result.moviedetails;
    const cast = movie.cast
      ? movie.cast.filter((actor) => actor.thumbnail)
      : [];

    return {
      ...movie,
      cast,
    };
  });

  return (
    <Show when={movie()} keyed>
      {(movie) => (
        <div>
          <Heading level={1}>
            {movie.title}
            {movie.year && ` (${movie.year})`}
          </Heading>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            {movie.art?.poster && (
              <div>
                <Thumbnail
                  type={ThumbnailType.Album}
                  uri={movie.art?.poster}
                  alt=""
                />
              </div>
            )}
            <div>
              <DefinitionList
                label="Album details"
                each={[
                  {
                    header: "Runtime",
                    description: movie.runtime
                      ? getVideoDuration(movie.runtime)
                      : "Unknown",
                  },
                  { header: "Genre", description: movie.genre || "Unknown" },
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
              {movie.plot && <p class="mt-3">{movie.plot}</p>}
            </div>
          </div>
          <Show when={movie.cast && movie.cast.length}>
            <Heading level={2}>Actors</Heading>
            <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
              <For each={movie.cast}>
                {(actor) => (
                  <div class="border-2 border-cyan-900 rounded-lg overflow-hidden">
                    <Thumbnail
                      type={ThumbnailType.Actor}
                      uri={actor.thumbnail}
                      alt=""
                    />
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      )}
    </Show>
  );
};

export default Movie;
