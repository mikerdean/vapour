import { RouteDefinition } from "@solidjs/router";

import Layout from "../components/layout";
import Home from "../components/views/home";

const routes: RouteDefinition[] = [
  {
    component: Layout,
    path: "/",
    children: [
      {
        component: Home,
        path: "/",
      },
    ],
  },
];

export default routes;
