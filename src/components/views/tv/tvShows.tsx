import { useGetTVShowsQuery } from "../../../socket/query";
import { toStringOf } from "../../../utils/number";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import useSearchPagination from "../../pagination/useSearchPagination";
import { TVShowsComponent } from "./tvShows.types";

const TVShows: TVShowsComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [tvShowsData] = useGetTVShowsQuery(query);

  const [tvShows, total] = useGridData(
    tvShowsData,
    (data) => data.tvshows,
    (tvshow) => ({
      ...tvshow,
      id: tvshow.tvshowid,
      played:
        tvshow.episode !== undefined &&
        tvshow.watchedepisodes !== undefined &&
        tvshow.episode > 0 &&
        tvshow.episode === tvshow.watchedepisodes,
      thumbnail: tvshow.art?.poster,
    }),
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

export default TVShows;
