import { For, Show, createMemo, createSignal } from "solid-js";

import { useMediaQuery } from "../../../../mediaQuery";
import useTypedParams from "../../../../routes/useTypedParams";
import { useGetMovieDetailsQuery } from "../../../../socket/query";
import type {
  VideoDetailsCast,
  VideoDetailsMovie,
} from "../../../../socket/types";
import { getVideoDuration } from "../../../../utils/duration";
import { movieValidator } from "../../../../validators";
import Button from "../../../core/button";
import DefinitionList from "../../../core/definitionList";
import Heading from "../../../core/heading";
import Thumbnail from "../../../core/thumbnail";
import { ThumbnailType } from "../../../core/thumbnail.types";
import type { MovieComponent } from "./types";

const Movie: MovieComponent = () => {
  const params = useTypedParams(movieValidator);

  const [castPage, setCastPage] = createSignal(1);
  const [isSmallScreen] = useMediaQuery("(min-width: 640px)");
  const [isMediumScreen] = useMediaQuery("(min-width: 768px)");
  const [isLargeScreen] = useMediaQuery("(min-width: 1024px)");

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

  const maxCast = createMemo<number>(() => {
    let castPerPage = 4;
    if (isSmallScreen()) {
      castPerPage = 6;
    }

    if (isMediumScreen()) {
      castPerPage = 8;
    }

    if (isLargeScreen()) {
      castPerPage = 12;
    }

    return castPage() * castPerPage;
  });

  const cast = createMemo<VideoDetailsCast[]>(() => {
    const movieMemo = movie();
    if (!movieMemo || !movieMemo.cast) {
      return [];
    }

    return movieMemo.cast
      .filter((actor) => actor.thumbnail)
      .slice(0, maxCast());
  });

  const castShowMore = createMemo<boolean>(() => {
    const movieMemo = movie();
    if (!movieMemo || !movieMemo.cast) {
      return false;
    }

    const filteredCast = movieMemo.cast.filter((actor) => actor.thumbnail);

    return maxCast() < filteredCast.length;
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
            <Show when={movie.art?.poster}>
              <div>
                <Thumbnail
                  type={ThumbnailType.Album}
                  uri={movie.art?.poster}
                  alt=""
                />
              </div>
            </Show>
            <div>
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
                    description: movie.genre
                      ? movie.genre.join(", ")
                      : "Unknown",
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
                <p class="mt-3">{movie.plot}</p>
              </Show>
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
            </div>
            <Show when={castShowMore()}>
              <div class="my-5">
                <Button onClick={() => setCastPage((prev) => prev + 1)}>
                  Show more cast...
                </Button>
              </div>
            </Show>
          </Show>
        </div>
      )}
    </Show>
  );
};

export default Movie;
