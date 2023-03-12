import {
  faFilm,
  faHome,
  faMusic,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

import FooterLink from "../footerLink";
import { FooterComponent } from "./types";

const Footer: FooterComponent = () => {
  return (
    <>
      <footer class="fixed bottom-0 bg-fuchsia-500 text-slate-100 w-full flex justify-center z-10">
        <FooterLink label="Home" icon={faHome} path="/" />
        <FooterLink label="Movies" icon={faFilm} path="/movies" />
        <FooterLink label="TV" icon={faTv} path="/tv" />
        <FooterLink label="Music" icon={faMusic} path="/music" />
      </footer>
      <div class="h-16" />
    </>
  );
};

export default Footer;
