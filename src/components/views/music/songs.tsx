import { createResource } from "solid-js";

import useTypedSearchParams from "../../../hooks/useTypedSearchParams";
import { pageValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import useGridData from "../../grid/useGridData";
import Pagination from "../../pagination";
import SongList from "./songList";
import type { SongsComponent } from "./songs.types";

const Songs: SongsComponent = () => {
  const [, { getSongs }] = useSocket();
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const [songData] = createResource(() => searchParams().page, getSongs);

  const [songs, total] = useGridData(
    songData,
    (data) => data.songs,
    (song) => ({ ...song, id: song.songid }),
  );

  return (
    <>
      <Pagination
        currentPage={searchParams().page}
        onPageSelected={(page) => setSearchParams({ page })}
        total={total()}
      />
      <SongList songs={songs()} />
    </>
  );
};

export default Songs;
