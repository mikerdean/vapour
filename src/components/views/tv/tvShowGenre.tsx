import { createMemo } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { useGetTVShowsQuery } from "../../../socket/query";
import { toStringOf } from "../../../utils/number";
import { genreValidator } from "../../../validators";
import Heading from "../../core/heading";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import useSearchPagination from "../../pagination/useSearchPagination";
import { TVShowGenreComponent } from "./tvShowGenre.types";

const TVShowGenre: TVShowGenreComponent = () => {
  const pageSize = 100;

  const params = useTypedParams(genreValidator);

  const decodedGenre = createMemo(() => {
    const genre = params().genre;
    if (!genre) {
      return genre;
    }

    return decodeURIComponent(genre);
  });

  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [tvShowData] = useGetTVShowsQuery(() => ({
    filter: {
      field: "genre",
      operator: "is",
      value: decodedGenre(),
    },
    ...query(),
  }));

  const [tvShows, total] = useGridData(
    tvShowData,
    (data) => data.tvshows,
    (tvshow) => ({
      ...tvshow,
      id: tvshow.tvshowid,
      played:
        tvshow.episode !== undefined &&
        tvshow.watchedepisodes !== undefined &&
        tvshow.episode > 0 &&
        tvshow.episode === tvshow.watchedepisodes,
      thumbnail: tvshow.art?.poster || tvshow.thumbnail,
    }),
  );

  return (
    <>
      <Heading level={1}>{decodedGenre()}</Heading>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
        pageSize={pageSize}
        total={total()}
      />
      <Grid each={tvShows()} thumbnailType={ThumbnailType.TVShow}>
        {(tvShow) => (
          <GridCard
            title={tvShow.title}
            items={[
              toStringOf(tvShow.episode, "episode", "episodes"),
              tvShow.year || "Unknown",
            ]}
          />
        )}
      </Grid>
    </>
  );
};

export default TVShowGenre;
