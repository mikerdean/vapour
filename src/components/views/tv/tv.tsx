import { Outlet } from "@solidjs/router";

import Tabs from "../../core/tabs";
import type { TabItem } from "../../core/tabs.types";
import type { TVComponent } from "./tv.types";

const TV: TVComponent = () => {
  const tvTabs: TabItem[] = [
    { label: "In Progress", path: "/tv" },
    { label: "Recent", path: "/tv/recent" },
    { label: "Titles", path: "/tv/titles" },
    { label: "Genres", path: "/tv/genres" },
  ];

  return (
    <>
      <div class="sticky top-11 z-10 bg-slate-900">
        <Tabs items={tvTabs} />
      </div>
      <div class="p-3" role="tabpanel">
        <h1 class="sr-only">TV Shows</h1>
        <Outlet />
      </div>
    </>
  );
};

export default TV;
