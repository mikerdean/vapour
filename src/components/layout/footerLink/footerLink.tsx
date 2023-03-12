import { NavLink } from "@solidjs/router";

import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import { FooterLinkComponent } from "./types";

const FooterLink: FooterLinkComponent = (props) => {
  return (
    <NavLink
      activeClass="text-slate-800"
      class="text-center px-4 py-2"
      href={props.path}
    >
      <FontAwesomeIcon icon={props.icon} size="lg" />
      <div class="text-sm mt-1">{props.label}</div>
    </NavLink>
  );
};

export default FooterLink;
