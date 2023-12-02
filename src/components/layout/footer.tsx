import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import {
  faCog,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import type { FooterComponent } from "./footer.types";
import FooterLink from "./footerLink";

const Footer: FooterComponent = () => {
  return (
    <>
      <footer class="fixed bottom-0 bg-fuchsia-600 text-slate-50 w-full flex justify-center z-10">
        <FooterLink label="Movies" icon={faFilm} path="/movies" />
        <FooterLink label="TV" icon={faDisplay} path="/tv" />
        <FooterLink label="Remote" icon={faCirclePlay} path="/" end />
        <FooterLink label="Music" icon={faMusic} path="/music" />
        <FooterLink label="Settings" icon={faCog} path="/settings" />
      </footer>
      <div class="h-40" />
    </>
  );
};

export default Footer;
