import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { mergeProps } from "solid-js";

import FontAwesomeIcon from "../images/fontAwesomeIcon";
import type { LoadingComponent } from "./loading.types";
import { defaultProps } from "./loading.utils";

const LoadingInlineBlock: LoadingComponent = (props) => {
  const merged = mergeProps(defaultProps, props);

  return (
    <div class="inline-block bg-neutral-600 p-2 rounded-md">
      <div>
        <FontAwesomeIcon class="animate-spin" icon={faCircleNotch} />
      </div>
      <div classList={{ "sr-only": merged.textVisible }}>{merged.text}</div>
    </div>
  );
};

export default LoadingInlineBlock;
