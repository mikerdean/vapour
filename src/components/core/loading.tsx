import { mergeProps } from "solid-js";
import type { LoadingComponent, LoadingProps } from "./loading.types";
import FullscreenMessage from "./fullscreenMessage";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const defaultProps: Partial<LoadingProps> = {
  text: <span>Loading...</span>,
  textVisible: false,
};

export const LoadingFullscreen: LoadingComponent = (props) => {
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

export const LoadingInline: LoadingComponent = (props) => {
  const merged = mergeProps(defaultProps, props);

  return (
    <span>
      <FontAwesomeIcon class="animate-spin" icon={faCircleNotch} />
      <span classList={{ "sr-only": !merged.textVisible }}>{merged.text}</span>
    </span>
  );
};

export const LoadingInlineBlock: LoadingComponent = (props) => {
  const merged = mergeProps(defaultProps, props);

  return (
    <div class="inline-block bg-neutral-600 p-2 rounded-md">
      <div>
        <FontAwesomeIcon class="animate-spin" icon={faCircleNotch} />
      </div>
      <div classList={{ "sr-only": !merged.textVisible }}>{merged.text}</div>
    </div>
  );
};
