import { createResource, Show } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { getVideoDuration } from "../../../utils/duration";
import { movieValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import DefinitionList from "../../core/definitionList";
import Heading from "../../core/heading";
import Rating from "../../core/rating";
import { ThumbnailType } from "../../images/thumbnail.types";
import ItemLayout from "../../layout/itemLayout";
import Cast from "./cast";
import type { MovieComponent } from "./movie.types";

const Movie: MovieComponent = () => {
  const [, { getMovieById }] = useSocket();
  const params = useTypedParams(movieValidator);

  const [movieData] = createResource(() => params().movieId, getMovieById);

  const joinArray = (
    arr: string[] | undefined,
    separator = ", ",
    unknownText = "Unknown",
  ) => (arr ? arr.join(separator) : unknownText);

  return (
    <ItemLayout
      backgroundArtUrl={movieData()?.moviedetails.art?.fanart}
      thumbnailType={ThumbnailType.Movie}
      thumbnailUrl={movieData()?.moviedetails.art?.poster}
      title={`${movieData()?.moviedetails.title}${
        movieData()?.moviedetails.year
          ? ` (${movieData()?.moviedetails.year})`
          : ""
      }`}
    >
      <DefinitionList
        label="Movie details"
        each={[
          {
            header: "Runtime",
            description: movieData()?.moviedetails.runtime
              ? getVideoDuration(movieData()?.moviedetails.runtime || 0)
              : "Unknown",
          },
          {
            header: "Genre",
            description: joinArray(movieData()?.moviedetails.genre),
          },
          {
            header: "Director",
            description: joinArray(movieData()?.moviedetails.director),
          },
          {
            header: "Writer",
            description: joinArray(movieData()?.moviedetails.writer),
          },
          {
            header: "Status",
            description:
              (movieData()?.moviedetails.playcount || 0) > 0
                ? "Watched"
                : "Unwatched",
          },
          {
            header: "Year",
            description: movieData()?.moviedetails.year || "Unknown",
          },
        ]}
      />
      <Show when={movieData()?.moviedetails.plot}>
        <p class="mb-3">{movieData()?.moviedetails.plot}</p>
      </Show>
      <Show when={movieData()?.moviedetails.rating}>
        <div class="mb-3">
          <Heading level={2}>Rating</Heading>
          <Rating value={movieData()?.moviedetails.rating} />
        </div>
      </Show>
      <Show when={(movieData()?.moviedetails.cast?.length || 0) > 0}>
        <Heading level={2}>Cast</Heading>
        <Cast cast={movieData()?.moviedetails.cast || []} />
      </Show>
    </ItemLayout>
  );
};

export default Movie;
