import { icon } from "@fortawesome/fontawesome-svg-core";
import { createMemo } from "solid-js";

import type { FontAwesomeIconComponent } from "./fontAwesomeIcon.types";

const FontAwesomeIcon: FontAwesomeIconComponent = (props) => {
  const parsedIcon = createMemo(() => icon(props.icon));

  const classes = createMemo(() => {
    const output = ["svg-inline--fa"];

    if (props.class) {
      output.push(props.class);
    }

    if (props.size) {
      output.push(`fa-${props.size}`);
    }

    if (props.fixedWidth) {
      output.push("fa-fw");
    }

    if (props.rotate) {
      output.push(`fa-rotate-${props.rotate}`);
    }

    return output.join(" ");
  });

  return (
    <svg
      aria-hidden="true"
      class={classes()}
      classList={props.classList}
      data-prefix={parsedIcon().prefix}
      data-icon={parsedIcon().iconName}
      role="img"
      viewBox={`0 0 ${parsedIcon().icon[0]} ${parsedIcon().icon[1]}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="currentColor" d={parsedIcon().icon[4].toString()} />
    </svg>
  );
};

export default FontAwesomeIcon;
