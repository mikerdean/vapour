import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { mergeProps } from "solid-js";

import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import { LoadingComponent } from "./types";
import { defaultProps } from "./utils";

const LoadingInline: LoadingComponent = (props) => {
  const merged = mergeProps(defaultProps, props);

  return (
    <span>
      <FontAwesomeIcon class="animate-spin" icon={faCircleNotch} />
      <span classList={{ "sr-only": !merged.textVisible }}>{merged.text}</span>
    </span>
  );
};

export default LoadingInline;