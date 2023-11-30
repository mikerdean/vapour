import { useGetInProgressTVShowsQuery } from "../../../socket/query";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import type { TVInProgressComponent } from "./tvInProgress.types";

const TVInProgress: TVInProgressComponent = () => {
  const [tvshowData] = useGetInProgressTVShowsQuery();

  const [tvshows] = useGridData(
    tvshowData,
    (data) => data.tvshows,
    (tvshow) => ({
      ...tvshow,
      id: tvshow.tvshowid,
      played: false,
      thumbnail: tvshow.art?.poster,
    }),
  );

  return (
    <>
      <Grid each={tvshows()} thumbnailType={ThumbnailType.TVShow}>
        {(tvshow) => (
          <GridCard
            title={tvshow.title}
            items={[
              `Watched ${tvshow.watchedepisodes} of ${tvshow.episode} episodes`,
              tvshow.year,
            ]}
          />
        )}
      </Grid>
    </>
  );
};

export default TVInProgress;
