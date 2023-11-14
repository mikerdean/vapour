import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { mergeProps } from "solid-js";

import FontAwesomeIcon from "../images/fontAwesomeIcon";
import type { LoadingComponent } from "./loading.types";
import { defaultProps } from "./loading.utils";

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
