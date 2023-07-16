import { useGetSongsQuery } from "../../../../socket/query";
import useGridData from "../../../grid/useGridData";
import SongList from "../songList";
import type { AlbumSongsComponent } from "./types";

const AlbumSongs: AlbumSongsComponent = (props) => {
  const [songData] = useGetSongsQuery(() => ({
    filter: {
      and: [
        { field: "albumartist", operator: "is", value: props.artist },
        { field: "album", operator: "is", value: props.album },
        { field: "year", operator: "is", value: props.year.toString() },
      ],
    },
    sort: { method: "year", order: "ascending" },
  }));

  const [songs] = useGridData(
    songData,
    (data) => data.songs,
    (song) => ({ ...song, id: song.songid }),
  );

  return <SongList songs={songs()} />;
};

export default AlbumSongs;
