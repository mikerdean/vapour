import "./index.css";

import { useRoutes } from "@solidjs/router";
import type { Component } from "solid-js";

import IntersectionObserverProvider from "./components/context/intersectionObserver";
import Host from "./components/root/host";
import Socket from "./components/root/socket";
import routes from "./routes";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <IntersectionObserverProvider>
      <Host>
        <Socket>
          <Routes />
        </Socket>
      </Host>
    </IntersectionObserverProvider>
  );
};

export default App;
