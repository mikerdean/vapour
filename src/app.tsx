import "./index.css";

import { useRoutes } from "@solidjs/router";
import { Component } from "solid-js";

import Host from "./components/root/host";
import Socket from "./components/root/socket";
import routes from "./routes";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <Host>
      <Socket>
        <Routes />
      </Socket>
    </Host>
  );
};

export default App;
