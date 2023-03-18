import { Outlet } from "@solidjs/router";

import Tabs from "../../core/tabs";
import { TabItem } from "../../core/tabs/types";
import { MusicComponent } from "./types";

const Music: MusicComponent = () => {
  const musicTabs: TabItem[] = [
    { label: "Recent", path: "/music" },
    { label: "Artists", path: "/music/artists" },
    { label: "Albums", path: "/music/albums" },
    { label: "Genres", path: "/music/genres" },
    { label: "Songs", path: "/music/songs" },
  ];

  return (
    <>
      <div class="sticky top-11 z-10 bg-slate-900">
        <Tabs items={musicTabs} />
      </div>
      <div class="p-3" role="tabpanel">
        <h1 class="sr-only">Music</h1>
        <Outlet />
      </div>
    </>
  );
};

export default Music;
