import { useGetSongsQuery } from "../../../../state/socket/commands";
import useGridData from "../../../grid/useGridData";
import Pagination from "../../../pagination";
import useSearchPagination from "../../../pagination/useSearchPagination";
import SongList from "../songList";
import { SongsComponent } from "./types";

const Songs: SongsComponent = () => {
  const pageSize = 100;
  const [query, searchParams, setSearchParams] = useSearchPagination(pageSize);
  const [songData] = useGetSongsQuery(query);

  const [songs, total] = useGridData(
    songData,
    (data) => data.songs,
    (song) => ({ ...song, id: song.songid })
  );

  return (
    <>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
        pageSize={pageSize}
        total={total()}
      />
      <SongList songs={songs()} />
    </>
  );
};

export default Songs;
