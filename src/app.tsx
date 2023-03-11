import "./index.css";

import { Component } from "solid-js";

import Host from "./components/root/host";

const App: Component = () => {
  return (
    <Host>
      <p>host found</p>
    </Host>
  );
};

export default App;
