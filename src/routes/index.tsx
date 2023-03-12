import { RouteDefinition } from "@solidjs/router";

import Layout from "../components/layout";
import Remote from "../components/views/remote";

const routes: RouteDefinition[] = [
  {
    component: Layout,
    path: "/",
    children: [
      {
        component: Remote,
        path: "/",
      },
    ],
  },
];

export default routes;
