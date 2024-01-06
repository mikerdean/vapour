import { A } from "@solidjs/router";

import FontAwesomeIcon from "../images/fontAwesomeIcon";
import type { FooterLinkComponent } from "./footerLink.types";

const FooterLink: FooterLinkComponent = (props) => {
  return (
    <A
      activeClass="border-b-4 border-slate-50"
      class="text-center px-4 py-2"
      end={props.end}
      href={props.path}
    >
      <FontAwesomeIcon icon={props.icon} size="lg" />
      <div class="text-sm mt-1">{props.label}</div>
    </A>
  );
};

export default FooterLink;
