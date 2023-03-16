import { createMemo } from "solid-js";

import { useGetArtistsQuery } from "../../../../state/socket/commands";
import { AudioDetailsArtist } from "../../../../state/socket/types";
import { ThumbnailType } from "../../../core/thumbnail/types";
import Grid from "../../../grid";
import GridCard from "../../../grid/gridCard";
import { GridItemOf } from "../../../grid/types";
import Pagination from "../../../pagination";
import useSearchPagination from "../../../pagination/useSearchPagination";
import { ArtistsComponent } from "./types";

const Artists: ArtistsComponent = () => {
  const emptyArray: GridItemOf<AudioDetailsArtist>[] = [];
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [artistData] = useGetArtistsQuery(query);

  const artists = createMemo(() => {
    const data = artistData();
    if (!data) {
      return emptyArray;
    }

    return data.artists.map((artist) => ({ ...artist, id: artist.artistid }));
  });

  const total = createMemo(() => {
    const data = artistData();
    if (!data) {
      return 0;
    }

    return data.limits.total;
  });

  return (
    <>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
        pageSize={pageSize}
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
