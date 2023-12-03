import { createMemo, createResource } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { genreValidator, pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Heading from "../../core/heading";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import type { MusicGenreComponent } from "./musicGenre.types";

const MusicGenre: MusicGenreComponent = () => {
  const [, { getArtistsByGenre }] = useSocket();
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

  const [artistData] = createResource(() => {
    const genre = decodedGenre();
    const page = searchParams().page;
    if (!genre || !page) {
      return null;
    }

    return { genre, page };
  }, getArtistsByGenre);

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
        total={total()}
      />
      <Grid each={artists()} thumbnailType={ThumbnailType.Artist}>
        {(artist) => <GridCard title={artist.label} />}
      </Grid>
    </>
  );
};

export default MusicGenre;
