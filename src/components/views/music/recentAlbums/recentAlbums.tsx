import { For } from "solid-js";

import { useGetRecentlyAddedAlbumsQuery } from "../../../../state/socket/commands/audio";
import { RecentAlbumsComponent } from "./types";

const RecentAlbums: RecentAlbumsComponent = () => {
  const [recentAlbumsData] = useGetRecentlyAddedAlbumsQuery();

  return (
    <div>
      <For each={recentAlbumsData()?.albums}>
        {(album) => <div>{album.title}</div>}
      </For>
    </div>
  );
};

export default RecentAlbums;
