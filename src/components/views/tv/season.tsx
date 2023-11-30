import useTypedParams from "../../../hooks/useTypedParams";
import {
  useGetSeasonDetailsQuery,
  useGetTVShowDetailsQuery,
} from "../../../socket/query";
import { skipToken } from "../../../socket/query/types";
import { toStringOf } from "../../../utils/number";
import { seasonValidator } from "../../../validators";
import DefinitionList from "../../core/definitionList";
import { ThumbnailType } from "../../images/thumbnail.types";
import ItemLayout from "../../layout/itemLayout";
import { SeasonComponent } from "./season.types";

const Season: SeasonComponent = () => {
  const params = useTypedParams(seasonValidator);

  const [seasonData] = useGetSeasonDetailsQuery(() => ({
    seasonid: params().seasonId,
  }));

  const [tvShowData] = useGetTVShowDetailsQuery(() => {
    const tvshowid = seasonData()?.seasondetails.tvshowid;
    return tvshowid ? { tvshowid } : skipToken;
  });

  const title = () => {
    const season = seasonData();
    const tvShow = tvShowData();

    if (season && tvShow) {
      return `${tvShow.tvshowdetails.title} - ${season.seasondetails.title}`;
    } else {
      return "Unknown";
    }
  };

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
            description: `${seasonData()?.seasondetails
              .season} of ${tvShowData()?.tvshowdetails.season}`,
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
            description:
              seasonData()?.seasondetails.episode ===
              seasonData()?.seasondetails.watchedepisodes
                ? "Watched"
                : (seasonData()?.seasondetails.watchedepisodes || 0) > 0
                  ? "In progress"
                  : "Not started",
          },
        ]}
      />
    </ItemLayout>
  );
};

export default Season;
