import { useGetRecentMoviesQuery } from "../../../../socket/query";
import { getVideoDuration } from "../../../../utils/duration";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import useGridData from "../../../grid/useGridData";
import type { RecentMoviesComponent } from "./types";

const RecentMovies: RecentMoviesComponent = () => {
  const [movieData] = useGetRecentMoviesQuery();

  const [movies] = useGridData(
    movieData,
    (data) => data.movies,
    (movie) => ({
      ...movie,
      id: movie.movieid,
      played: movie.playcount !== undefined && movie.playcount > 0,
      thumbnail: movie.art?.poster,
    })
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
