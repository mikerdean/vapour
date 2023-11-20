import { Show } from "solid-js";

import createKodiImageUrl from "../../../hooks/createKodiImageUrl";
import useTypedParams from "../../../hooks/useTypedParams";
import {
  useGetSeasonsQuery,
  useGetTVShowDetailsQuery,
} from "../../../socket/query";
import { tvShowValidator } from "../../../validators";
import Heading from "../../core/heading";
import { ThumbnailType } from "../../core/thumbnail.types";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { TVShowComponent } from "./tvShow.types";

const TVShow: TVShowComponent = () => {
  const params = useTypedParams(tvShowValidator);

  const [seasonData] = useGetSeasonsQuery(() => ({
    tvshowid: params().tvShowId,
  }));

  const [tvShowData] = useGetTVShowDetailsQuery(() => ({
    tvshowid: params().tvShowId,
  }));

  const fanartUrl = createKodiImageUrl(() => {
    const tvShow = tvShowData()?.tvshowdetails;
    return tvShow ? tvShow.art?.fanart : undefined;
  });

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

  return (
    <>
      <Show when={fanartUrl()}>
        <div class="hidden sm:block absolute top-0 left-0 w-screen h-screen -z-10 opacity-10">
          <img src={fanartUrl()} alt="" class="object-cover w-full h-full" />
        </div>
      </Show>
      <Heading level={1}>{tvShowData()?.tvshowdetails.title}</Heading>
      <Grid each={seasons()} thumbnailType={ThumbnailType.Season}>
        {(season) => (
          <GridCard
            title={season.title}
            items={[
              `${season.episode} episodes`,
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
