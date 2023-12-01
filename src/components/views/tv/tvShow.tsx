import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import {
  useGetSeasonsQuery,
  useGetTVShowDetailsQuery,
} from "../../../socket/query";
import { toStringOf } from "../../../utils/number";
import { tvShowValidator } from "../../../validators";
import Heading from "../../core/heading";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import Fanart from "../../images/fanart";
import { ThumbnailType } from "../../images/thumbnail.types";
import { TVShowComponent } from "./tvShow.types";

const TVShow: TVShowComponent = () => {
  const params = useTypedParams(tvShowValidator);
  const navigate = useNavigate();

  const [seasonData] = useGetSeasonsQuery(() => ({
    tvshowid: params().tvShowId,
  }));

  const [tvShowData] = useGetTVShowDetailsQuery(() => ({
    tvshowid: params().tvShowId,
  }));

  const [seasons] = useGridData(
    seasonData,
    (data) => data.seasons,
    (season) => ({
      ...season,
      id: season.seasonid,
      played: season.episode === season.watchedepisodes,
      thumbnail: season.art?.poster,
    }),
  );

  createEffect(() => {
    const seasons = seasonData();
    if (seasons && seasons.limits.total === 1) {
      navigate(`/tv/seasons/${seasons.seasons[0].seasonid}`, { replace: true });
    }
  });

  return (
    <>
      <Fanart uri={tvShowData()?.tvshowdetails.art?.fanart} />
      <Heading level={1}>{tvShowData()?.tvshowdetails.title}</Heading>
      <Grid each={seasons()} thumbnailType={ThumbnailType.Season}>
        {(season) => (
          <GridCard
            title={season.title}
            items={[
              toStringOf(season.episode, "episode", "episodes"),
              season.episode === season.watchedepisodes
                ? "Watched"
                : season.watchedepisodes > 0
                  ? "In progress"
                  : "Not started",
            ]}
          />
        )}
      </Grid>
    </>
  );
};

export default TVShow;
