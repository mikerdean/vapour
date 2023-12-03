import { createMemo, createResource } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { toStringOf } from "../../../utils/number";
import { genreValidator, pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Heading from "../../core/heading";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import { TVShowGenreComponent } from "./tvShowGenre.types";

const TVShowGenre: TVShowGenreComponent = () => {
  const [, { getTVShowsByGenre }] = useSocket();
  const params = useTypedParams(genreValidator);

  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const decodedGenre = createMemo(() => {
    const genre = params().genre;
    if (!genre) {
      return genre;
    }

    return decodeURIComponent(genre);
  });

  const [tvShowData] = createResource(
    () => ({
      genre: decodedGenre(),
      page: searchParams().page,
    }),
    getTVShowsByGenre,
  );

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

export default TVShowGenre;
