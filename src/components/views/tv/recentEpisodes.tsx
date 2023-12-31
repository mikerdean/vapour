import { createResource } from "solid-js";

import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import { RecentEpisodesComponent } from "./recentEpisodes.types";

const RecentEpisodes: RecentEpisodesComponent = () => {
  const [, { getRecentlyAddedEpisodes }] = useSocket();
  const [episodesData] = createResource(getRecentlyAddedEpisodes);

  const [episodes] = useGridData(
    episodesData,
    (data) => data.episodes,
    (episode) => ({
      ...episode,
      id: episode.episodeid,
      played: (episode.playcount || 0) > 0,
      thumbnail: episode.art?.thumb,
    }),
  );

  return (
    <>
      <Grid each={episodes()} thumbnailType={ThumbnailType.Episode}>
        {(episode) => (
          <GridCard
            title={episode.title}
            items={[episode.showtitle, `Season ${episode.season}`]}
          />
        )}
      </Grid>
    </>
  );
};

export default RecentEpisodes;
