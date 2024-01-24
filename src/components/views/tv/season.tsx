import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckCircle,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { createMemo, createResource, For, Show } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { getVideoDuration } from "../../../utils/duration";
import { toStringOf } from "../../../utils/number";
import { seasonValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import DefinitionList from "../../core/definitionList";
import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import { ThumbnailType } from "../../images/thumbnail.types";
import ItemLayout from "../../layout/itemLayout";
import { SeasonComponent } from "./season.types";

const Season: SeasonComponent = () => {
  const [, { getSeasonById, getEpisodesByTVShowSeason, getTVShowById }] =
    useSocket();

  const params = useTypedParams(seasonValidator);

  const [seasonData] = createResource(() => params().seasonId, getSeasonById);

  const [tvShowData] = createResource(
    () => seasonData()?.seasondetails.tvshowid || null,
    getTVShowById,
  );

  const [episodeData] = createResource(() => {
    const details = seasonData()?.seasondetails;
    if (!details) {
      return null;
    }

    const { season, tvshowid } = details;
    return { season, tvshowid };
  }, getEpisodesByTVShowSeason);

  const title = createMemo<string>(() => {
    const season = seasonData();
    const tvShow = tvShowData();

    if (season && tvShow) {
      return `${tvShow.tvshowdetails.title} - ${season.seasondetails.title}`;
    } else {
      return "Unknown";
    }
  });

  const watchedEpisodes = createMemo<string>(() => {
    const episodes = episodeData()?.episodes;

    if (!episodes) {
      return "";
    }

    const watched = episodes.filter((ep) => (ep.playcount || 0) > 0).length;
    if (watched === episodes.length) {
      return "Watched";
    } else if (watched > 0) {
      return "In progress";
    } else {
      return "Not started";
    }
  });

  return (
    <ItemLayout
      backgroundArtUrl={tvShowData()?.tvshowdetails?.art?.fanart}
      thumbnailType={ThumbnailType.Season}
      thumbnailUrl={seasonData()?.seasondetails?.art?.poster}
      title={title()}
    >
      <DefinitionList
        label="Season details"
        each={[
          {
            header: "Season",
            description: `${
              seasonData()?.seasondetails.season
            } of ${tvShowData()?.tvshowdetails.season}`,
          },
          {
            header: "Episodes",
            description:
              toStringOf(
                seasonData()?.seasondetails.episode,
                "episode",
                "episodes",
              ) || "Unknown",
          },
          {
            header: "Watched",
            description: watchedEpisodes(),
          },
        ]}
      />
      <ol class="text-sm">
        <For each={episodeData()?.episodes}>
          {(episode, i) => (
            <li
              class="p-2"
              classList={{
                "bg-slate-800": i() % 2 !== 0,
              }}
            >
              <div class="flex items-center">
                <button type="button" class="flex w-full">
                  <span class="mr-3">
                    {episode.season === 0 ? "s" : "e"}
                    {String(episode.episode).padStart(
                      String((episodeData()?.episodes || []).length).length,
                      "0",
                    )}
                  </span>
                  <span class="mr-3">
                    <Show
                      when={(episode.playcount || 0) > 0}
                      fallback={<FontAwesomeIcon icon={faCircle} />}
                    >
                      <FontAwesomeIcon
                        class="text-fuchsia-500"
                        icon={faCheckCircle}
                      />
                    </Show>
                  </span>
                  <span class="grow text-left mr-3">{episode.title}</span>
                  {episode.runtime && (
                    <span>{getVideoDuration(episode.runtime)}</span>
                  )}
                </button>
                <button class="pl-3">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                  <span class="sr-only">Options for {episode.label}</span>
                </button>
              </div>
            </li>
          )}
        </For>
      </ol>
    </ItemLayout>
  );
};

export default Season;
