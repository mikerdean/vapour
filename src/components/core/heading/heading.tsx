import { Dynamic } from "solid-js/web";

import type { HeadingComponent } from "./types";
import { getHeadingClass } from "./utils";

const Heading: HeadingComponent = (props) => {
  const tag = () => `h${props.level}`;
  const classes = () => getHeadingClass(props.level);

  return (
    <Dynamic component={tag()} class={classes()}>
      {props.children}
    </Dynamic>
  );
};

export default Heading;
