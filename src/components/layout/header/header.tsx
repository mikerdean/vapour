import {
  faCircleUser,
  faEllipsisVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import KodiLogo from "../../images/kodiLogo";
import { HeaderComponent } from "./types";

const Header: HeaderComponent = () => {
  return (
    <header class="sticky top-0 w-full bg-fuchsia-500 text-slate-100 z-10">
      <div class="flex py-2 px-3 items-center">
        <KodiLogo />
        <h1 class="grow ml-2 text-lg">
          <span>Kodi</span>
        </h1>
        <div>
          <button class="mr-6" title="Search">
            <FontAwesomeIcon icon={faSearch} />
            <span class="sr-only">Search</span>
          </button>
          <button class="mr-6" title="Change profile">
            <FontAwesomeIcon icon={faCircleUser} />
            <span class="sr-only">Change profile</span>
          </button>
          <button title="Edit settings">
            <FontAwesomeIcon icon={faEllipsisVertical} />
            <span class="sr-only">Edit settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;