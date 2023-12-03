import { createResource } from "solid-js";

import { getVideoDuration } from "../../../utils/duration";
import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import type { RecentMoviesComponent } from "./recentMovies.types";

const RecentMovies: RecentMoviesComponent = () => {
  const [, { getRecentlyAddedMovies }] = useSocket();
  const [movieData] = createResource(getRecentlyAddedMovies);

  const [movies] = useGridData(
    movieData,
    (data) => data.movies,
    (movie) => ({
      ...movie,
      id: movie.movieid,
      played: movie.playcount !== undefined && movie.playcount > 0,
      thumbnail: movie.art?.poster,
    }),
  );

  return (
    <>
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

export default RecentMovies;
