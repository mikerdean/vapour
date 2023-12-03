import { createResource } from "solid-js";

import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import type { TVShowGenresComponent } from "./tvShowGenres.types";

const TVShowGenres: TVShowGenresComponent = () => {
  const [, { getTVShowGenres }] = useSocket();
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const [genreData] = createResource(
    () => searchParams().page,
    getTVShowGenres,
  );

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
        pageSize={100}
        total={total()}
      />
      <Grid each={genres()} thumbnailType={ThumbnailType.TVShowGenre}>
        {(genre) => <GridCard title={genre.label} />}
      </Grid>
    </>
  );
};

export default TVShowGenres;
