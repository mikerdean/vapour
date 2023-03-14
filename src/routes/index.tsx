import { RouteDefinition } from "@solidjs/router";

import Layout from "../components/layout";
import Movies from "../components/views/movies";
import Music from "../components/views/music";
import Albums from "../components/views/music/albums";
import Artists from "../components/views/music/artists";
import Genres from "../components/views/music/genres";
import RecentAlbums from "../components/views/music/recentAlbums";
import Songs from "../components/views/music/songs";
import Remote from "../components/views/remote";
import Settings from "../components/views/settings";
import TV from "../components/views/tv";

const routes: RouteDefinition[] = [
  {
    component: Layout,
    path: "/",
    children: [
      {
        component: Remote,
        path: "/",
      },
      {
        component: Music,
        path: "music",
        children: [
          {
            component: RecentAlbums,
            path: "/",
          },
          {
            component: Artists,
            path: "/artists",
          },
          {
            component: Albums,
            path: "/albums",
          },
          {
            component: Genres,
            path: "/genres",
          },
          {
            component: Songs,
            path: "/songs",
          },
        ],
      },
      {
        component: TV,
        path: "tv",
      },
      {
        component: Movies,
        path: "movies",
      },
      {
        component: Settings,
        path: "settings",
      },
    ],
  },
];

export default routes;
