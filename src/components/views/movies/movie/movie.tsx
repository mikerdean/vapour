import { For, Show, createMemo, createSignal } from "solid-js";

import useTypedParams from "../../../../routes/useTypedParams";
import { useGetMovieDetailsQuery } from "../../../../socket/query";
import type {
  VideoDetailsCast,
  VideoDetailsMovie,
} from "../../../../socket/types";
import { getVideoDuration } from "../../../../utils/duration";
import { movieValidator } from "../../../../validators";
import DefinitionList from "../../../core/definitionList";
import Heading from "../../../core/heading";
import Thumbnail from "../../../core/thumbnail";
import { ThumbnailType } from "../../../core/thumbnail/types";
import type { MovieComponent } from "./types";

const Movie: MovieComponent = () => {
  const params = useTypedParams(movieValidator);

  const [maxActors, setMaxActors] = createSignal(10);

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

  const cast = createMemo<VideoDetailsCast[]>(() => {
    const movieMemo = movie();
    if (!movieMemo || !movieMemo.cast) {
      return [];
    }

    return movieMemo.cast
      .filter((actor) => actor.thumbnail)
      .slice(0, maxActors());
  });

  const castShowMore = createMemo<boolean>(() => {
    const movieMemo = movie();
    if (!movieMemo || !movieMemo.cast) {
      return false;
    }

    const filteredCast = movieMemo.cast.filter((actor) => actor.thumbnail);

    return maxActors() < filteredCast.length;
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
          <Show when={cast().length}>
            <Heading level={2}>Cast</Heading>
            <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
              <For each={cast()}>
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
              <Show when={castShowMore()}>
                <div>
                  <button
                    class="border-2 border-cyan-900 rounded-lg overflow-hidden w-full h-full text-xs p-1"
                    onClick={() => setMaxActors((prev) => prev + 10)}
                    type="button"
                  >
                    Show more cast...
                  </button>
                </div>
              </Show>
            </div>
          </Show>
        </div>
      )}
    </Show>
  );
};

export default Movie;
