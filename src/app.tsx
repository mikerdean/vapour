import "./index.css";

import { Component } from "solid-js";

import Host from "./components/root/host";
import Socket from "./components/root/socket";

const App: Component = () => {
  return (
    <Host>
      <Socket>
        <p>Connected</p>
      </Socket>
    </Host>
  );
};

export default App;
