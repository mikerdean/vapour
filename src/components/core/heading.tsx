import { Dynamic } from "solid-js/web";

import type { HeadingComponent, HeadingLevel } from "./heading.types";

const headingClasses: Record<HeadingLevel, string> = {
  [1]: "text-xl border-b-2 border-slate-600 text-cyan-400 mb-4",
  [2]: "text-lg text-cyan-500 mb-3 underline underline-offset-4 decoration-2 decoration-cyan-900",
  [3]: "",
  [4]: "",
  [5]: "",
  [6]: "",
};

const Heading: HeadingComponent = (props) => {
  const tag = () => `h${props.level}`;
  const classes = () => headingClasses[props.level];

  return (
    <Dynamic id={props.id} component={tag()} class={classes()}>
      {props.children}
    </Dynamic>
  );
};

export default Heading;
