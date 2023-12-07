import {
  faCog,
  faCubes,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import { usePlayer } from "../context/playerProvider";
import type { FooterComponent } from "./footer.types";
import FooterLink from "./footerLink";

const Footer: FooterComponent = () => {
  const [player] = usePlayer();

  return (
    <>
      <footer class="fixed bottom-0 bg-fuchsia-600 text-slate-50 w-full flex justify-center z-10">
        <FooterLink label="Movies" icon={faFilm} path="/movies" />
        <FooterLink label="TV" icon={faDisplay} path="/tv" />
        <FooterLink label="Music" icon={faMusic} path="/music" />
        <FooterLink label="Addons" icon={faCubes} path="/addons" />
        <FooterLink label="Settings" icon={faCog} path="/settings" />
      </footer>
      <div class={player.item ? "h-48" : "h-20"} />
    </>
  );
};

export default Footer;
