import {
  faCircleUser,
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { createMemo, Show } from "solid-js";

import {
  useGetCurrentProfileQuery,
  useGetProfilesQuery,
} from "../../socket/query";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import KodiLogo from "../images/kodiLogo";
import type { HeaderComponent } from "./header.types";

const Header: HeaderComponent = () => {
  const [currentProfileData] = useGetCurrentProfileQuery();
  const [profilesData] = useGetProfilesQuery();

  const allowProfileChange = createMemo<boolean>(() => {
    const currentProfile = currentProfileData();
    const profiles = profilesData();

    return (
      currentProfile !== undefined &&
      profiles !== undefined &&
      profiles.limits.total > 1
    );
  });

  return (
    <header class="sticky top-0 w-full bg-fuchsia-600 text-slate-50 z-10">
      <div class="flex py-2 px-3 items-center">
        <KodiLogo />
        <p class="grow ml-2 text-lg">
          <span>Kodi</span>
        </p>
        <div>
          <button class="mr-6">
            <FontAwesomeIcon icon={faSearch} />
            <span class="sr-only">Search</span>
          </button>
          <Show when={allowProfileChange()}>
            <button class="mr-6">
              <FontAwesomeIcon icon={faCircleUser} />
              <span class="sr-only">Change profile</span>
            </button>
          </Show>
          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} />
            <span class="sr-only">Edit settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;