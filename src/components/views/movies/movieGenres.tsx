import { createResource } from "solid-js";

import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import type { MovieGenresComponent } from "./movieGenres.types";

const MovieGenres: MovieGenresComponent = () => {
  const [, { getMovieGenres }] = useSocket();
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });
  const [genreData] = createResource(() => 1, getMovieGenres);

  const [genres, total] = useGridData(
    genreData,
    (data) => data.genres,
    (genre) => ({ ...genre, id: encodeURIComponent(genre.label) }),
  );

  return (
    <>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => {
          setSearchParams({ page });
          window.scrollTo({ top: 0 });
        }}
        total={total()}
      />
      <Grid each={genres()} thumbnailType={ThumbnailType.MovieGenre}>
        {(genre) => <GridCard title={genre.label} />}
      </Grid>
    </>
  );
};

export default MovieGenres;
