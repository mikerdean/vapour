import { useGetArtistsQuery } from "../../../socket/query";
import Grid from "../../grid";
import GridCard from "../../grid/gridCard";
import useGridData from "../../grid/useGridData";
import { ThumbnailType } from "../../images/thumbnail.types";
import Pagination from "../../pagination";
import useSearchPagination from "../../pagination/useSearchPagination";
import type { ArtistsComponent } from "./artists.types";

const Artists: ArtistsComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [artistData] = useGetArtistsQuery(query);

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
