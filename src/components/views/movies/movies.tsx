import { Outlet } from "@solidjs/router";

import Tabs from "../../core/tabs";
import type { TabItem } from "../../core/tabs.types";
import type { MoviesComponent } from "./types";

const Movies: MoviesComponent = () => {
  const moviesTabs: TabItem[] = [
    { label: "Recent", path: "/movies" },
    { label: "Titles", path: "/movies/titles" },
    { label: "Sets", path: "/movies/sets" },
    { label: "Genres", path: "/movies/genres" },
  ];

  return (
    <>
      <div class="sticky top-11 z-10 bg-slate-900">
        <Tabs items={moviesTabs} />
      </div>
      <div class="p-3" role="tabpanel">
        <h1 class="sr-only">Movies</h1>
        <Outlet />
      </div>
    </>
  );
};

export default Movies;
