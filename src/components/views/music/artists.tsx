import { createResource } from "solid-js";

import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import type { ArtistsComponent } from "./artists.types";

const Artists: ArtistsComponent = () => {
  const [, { getArtists }] = useSocket();
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const [artistData] = createResource(() => searchParams().page, getArtists);

  const [artists, total] = useGridData(
    artistData,
    (data) => data.artists,
    (artist) => ({ ...artist, id: artist.artistid }),
  );

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
      <Grid each={artists()} thumbnailType={ThumbnailType.Artist}>
        {(album) => (
          <GridCard
            title={album.label}
            items={album.songgenres
              ?.map((genre) => genre.title)
              .slice(0, 2)
              .sort()}
          />
        )}
      </Grid>
    </>
  );
};

export default Artists;
