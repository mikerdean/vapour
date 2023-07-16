import { createMemo } from "solid-js";

import {
  useGetMovieSetsQuery,
  useGetMoviesQuery,
} from "../../../../socket/query";
import { skipToken } from "../../../../socket/query/types";
import type {
  GetMoviesQuery,
  KodiMessageFilterOfType,
} from "../../../../socket/types";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import useGridData from "../../../grid/useGridData";
import Pagination from "../../../pagination";
import useSearchPagination from "../../../pagination/useSearchPagination";
import type { MovieSetsComponent } from "./types";

const MovieSets: MovieSetsComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [movieSetData] = useGetMovieSetsQuery(query);

  const movieQuery = createMemo<Partial<GetMoviesQuery> | typeof skipToken>(
    () => {
      const data = movieSetData();
      if (!data) {
        return skipToken;
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
    },
  );

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
    }),
  );

  const getMovieSetTitle = (title: string | undefined): string | undefined => {
    const sets = moviesInSets();
    if (!title) {
      return undefined;
    }

    const total = sets[title] || 0;
    if (total < 1) {
      return undefined;
    }

    if (total === 1) {
      return "1 movie";
    }

    return `${total} movies`;
  };

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
      <Grid each={movieSets()} thumbnailType={ThumbnailType.MovieSet}>
        {(set) => (
          <GridCard title={set.title} items={[getMovieSetTitle(set.title)]} />
        )}
      </Grid>
    </>
  );
};

export default MovieSets;
