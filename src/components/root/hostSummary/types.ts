import { Component } from "solid-js";

import { Host } from "../../../state/host/types";

export type HostSummaryComponent = Component<{
  host?: Host;
}>;
