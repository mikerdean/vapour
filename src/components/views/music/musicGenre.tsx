import { createMemo } from "solid-js";

import useTypedParams from "../../../routes/useTypedParams";
import { useGetArtistsQuery } from "../../../socket/query";
import { genreValidator } from "../../../validators";
import Heading from "../../core/heading";
import { ThumbnailType } from "../../core/thumbnail.types";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import Pagination from "../../pagination";
import useSearchPagination from "../../pagination/useSearchPagination";
import type { MusicGenreComponent } from "./musicGenre.types";

const MusicGenre: MusicGenreComponent = () => {
  const pageSize = 100;

  const params = useTypedParams(genreValidator);

  const decodedGenre = createMemo(() => {
    const genre = params().genre;
    if (!genre) {
      return genre;
    }

    return decodeURIComponent(genre);
  });

  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [artistData] = useGetArtistsQuery(() => ({
    filter: {
      field: "genre",
      operator: "is",
      value: decodedGenre(),
    },
    ...query(),
  }));

  const [artists, total] = useGridData(
    artistData,
    (data) => data.artists,
    (artist) => ({ ...artist, id: artist.artistid }),
  );

  return (
    <>
      <Heading level={1}>{decodedGenre()}</Heading>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
        pageSize={pageSize}
        total={total()}
      />
      <Grid each={artists()} thumbnailType={ThumbnailType.Artist}>
        {(artist) => <GridCard title={artist.label} />}
      </Grid>
    </>
  );
};

export default MusicGenre;
