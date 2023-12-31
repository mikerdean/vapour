import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";

import FontAwesomeIcon from "./fontAwesomeIcon";
import type { ThumbnailPlayedComponent } from "./thumbnailPlayed.types";

const ThumbnailPlayed: ThumbnailPlayedComponent = () => {
  return (
    <>
      <FontAwesomeIcon
        class="absolute right-1 bottom-1 text-fuchsia-500 z-[3]"
        icon={faCheckCircle}
      />
      <FontAwesomeIcon
        class="absolute right-1 bottom-1 text-slate-900 z-[2]"
        icon={faCircle}
      />
    </>
  );
};

export default ThumbnailPlayed;
