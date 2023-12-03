import { createResource } from "solid-js";

import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { toStringOf } from "../../../utils/number";
import { pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import { TVShowsComponent } from "./tvShows.types";

const TVShows: TVShowsComponent = () => {
  const [, { getTVShows }] = useSocket();
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const [tvShowsData] = createResource(() => searchParams().page, getTVShows);

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
        pageSize={100}
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
