import { For, Show, createMemo, createSignal } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { useGetMovieDetailsQuery } from "../../../socket/query";
import type {
  VideoDetailsCast,
  VideoDetailsMovie,
} from "../../../socket/types";
import { getVideoDuration } from "../../../utils/duration";
import { movieValidator } from "../../../validators";
import Button from "../../core/button";
import DefinitionList from "../../core/definitionList";
import Heading from "../../core/heading";
import Thumbnail from "../../core/thumbnail";
import { ThumbnailType } from "../../core/thumbnail.types";
import type { MovieComponent } from "./movie.types";
import createKodiImageUrl from "../../../hooks/createKodiImageUrl";
import Rating from "../../core/rating";

const Movie: MovieComponent = () => {
  const params = useTypedParams(movieValidator);

  const castPerPage = 6;
  const [castPage, setCastPage] = createSignal(1);

  const maxCast = createMemo<number>(() => {
    return castPage() * castPerPage;
  });

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

  const fanartUrl = createKodiImageUrl(() => {
    const movieMemo = movie();
    return movieMemo ? movieMemo.art?.fanart : undefined;
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

  const joinArray = (
    arr: string[] | undefined,
    separator = ", ",
    unknownText = "Unknown",
  ) => (arr ? arr.join(separator) : unknownText);

  return (
    <Show when={movie()} keyed>
      {(movie) => (
        <div>
          <div class="hidden sm:block absolute top-0 left-0 w-screen h-screen -z-10 opacity-10">
            <img src={fanartUrl()} alt="" class="object-cover w-full h-full" />
          </div>
          <Heading level={1}>
            {movie.title}
            {movie.year && ` (${movie.year})`}
          </Heading>
          <div class="sm:flex">
            <Show when={movie.art?.poster}>
              <div class="mr-5 mb-5 sm:max-w-sm">
                <Thumbnail
                  type={ThumbnailType.Album}
                  uri={movie.art?.poster}
                  alt=""
                />
              </div>
            </Show>
            <div class="max-w-lg mb-3">
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
              <Show when={movie.rating !== undefined}>
                <div class="mb-3">
                  <Heading level={2}>Rating</Heading>
                  <Rating value={movie.rating} />
                </div>
              </Show>
              <Show when={cast().length}>
                <Heading level={2}>Cast</Heading>
                <div class="grid grid-cols-6 gap-3">
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
          </div>
        </div>
      )}
    </Show>
  );
};

export default Movie;
