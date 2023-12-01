import { useGetTVShowGenresQuery } from "../../../socket/query";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import useSearchPagination from "../../pagination/useSearchPagination";
import type { TVShowGenresComponent } from "./tvShowGenres.types";

const TVShowGenres: TVShowGenresComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [genreData] = useGetTVShowGenresQuery(query);

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
        pageSize={pageSize}
        total={total()}
      />
      <Grid each={genres()} thumbnailType={ThumbnailType.TVShowGenre}>
        {(genre) => <GridCard title={genre.label} />}
      </Grid>
    </>
  );
};

export default TVShowGenres;
