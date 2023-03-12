import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { mergeProps } from "solid-js";

import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import FullscreenMessage from "../fullscreenMessage";
import { LoadingComponent } from "./types";
import { defaultProps } from "./utils";

const LoadingFullscreen: LoadingComponent = (props) => {
  const merged = mergeProps(defaultProps, props);

  return (
    <FullscreenMessage>
      <div class="text-center">
        <FontAwesomeIcon class="animate-spin" icon={faCircleNotch} size="6x" />
        <div class="mt-2" classList={{ "sr-only": !merged.textVisible }}>
          {merged.text}
        </div>
      </div>
    </FullscreenMessage>
  );
};

export default LoadingFullscreen;
