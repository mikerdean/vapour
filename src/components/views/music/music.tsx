import Tabs from "../../core/tabs";
import type { TabItem } from "../../core/tabs.types";
import type { MusicComponent } from "./music.types";

const Music: MusicComponent = (props) => {
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
        {props.children}
      </div>
    </>
  );
};

export default Music;
