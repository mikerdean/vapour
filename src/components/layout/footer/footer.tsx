import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import {
  faCog,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import FooterLink from "../footerLink";
import { FooterComponent } from "./types";

const Footer: FooterComponent = () => {
  return (
    <>
      <footer class="fixed bottom-0 bg-fuchsia-500 text-slate-100 w-full flex justify-center z-10">
        <FooterLink label="Movies" icon={faFilm} path="/movies" />
        <FooterLink label="TV" icon={faDisplay} path="/tv" />
        <FooterLink label="Remote" icon={faCirclePlay} path="/" end />
        <FooterLink label="Music" icon={faMusic} path="/music" />
        <FooterLink label="Settings" icon={faCog} path="/settings" />
      </footer>
      <div class="h-16" />
    </>
  );
};

export default Footer;
