import DefinitionList from "../core/definitionList";
import type { HostSummaryComponent } from "./hostSummary.types";

const HostSummary: HostSummaryComponent = (props) => {
  return (
    <DefinitionList
      label="Host details"
      each={[
        { header: "Hostname", description: props.host?.hostname || "Unknown" },
        { header: "HTTP port", description: props.host?.httpPort || "Unknown" },
        { header: "TCP port", description: props.host?.tcpPort || "Unknown" },
      ]}
    />
  );
};

export default HostSummary;
