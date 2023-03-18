import { createMemo } from "solid-js";

import {
  useGetMovieSetsQuery,
  useGetMoviesQuery,
} from "../../../../state/socket/commands";
import { KodiMessageFilterOfType } from "../../../../state/socket/types";
import { GetMoviesQuery } from "../../../../state/socket/types/video";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import useGridData from "../../../grid/useGridData";
import Pagination from "../../../pagination";
import useSearchPagination from "../../../pagination/useSearchPagination";
import { MovieSetsComponent } from "./types";

const MovieSets: MovieSetsComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [movieSetData] = useGetMovieSetsQuery(query);

  const movieQuery = createMemo<Partial<GetMoviesQuery> | null>(() => {
    const data = movieSetData();
    if (!data) {
      return null;
    }

    return {
      filter: {
        or: data.sets.map<KodiMessageFilterOfType>((set) => ({
          field: "set",
          operator: "is",
          value: set.title || "",
        })),
      },
      properties: ["set"],
    };
  });

  const [movieData] = useGetMoviesQuery(movieQuery);

  const moviesInSets = createMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    const data = movieData();
    if (data) {
      data.movies.forEach((movie) => {
        const setName = movie.set || "__UNKNOWN__";
        if (!map[setName]) {
          map[setName] = 0;
        }

        map[setName] += 1;
      });
    }

    return map;
  });

  const [movieSets, total] = useGridData(
    movieSetData,
    (data) => data.sets,
    (movieSet) => ({
      ...movieSet,
      id: movieSet.setid,
      played: movieSet.playcount !== undefined && movieSet.playcount > 0,
      thumbnail: movieSet.art?.poster,
    })
  );

  return (
    <>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
        pageSize={pageSize}
        total={total()}
      />
      <Grid each={movieSets()} thumbnailType={ThumbnailType.Movie}>
        {(set) => (
          <GridCard
            title={set.title}
            items={[`${moviesInSets()[set.title || ""] || 0} movies`]}
          />
        )}
      </Grid>
    </>
  );
};

export default MovieSets;
