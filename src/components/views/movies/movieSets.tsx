import { createMemo, createResource } from "solid-js";

import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import type { MovieSetsComponent } from "./movieSets.types";

const MovieSets: MovieSetsComponent = () => {
  const [, { getMovieSets, getMoviesInSets }] = useSocket();
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const [movieSetData] = createResource(
    () => searchParams().page,
    getMovieSets,
  );

  const [movieData] = createResource(getMoviesInSets);

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
        pageSize={100}
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
