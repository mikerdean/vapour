import { RouteDefinition } from "@solidjs/router";

import Layout from "../components/layout";
import Movies from "../components/views/movies";
import Music from "../components/views/music";
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
