import { Dynamic } from "solid-js/web";

import type { HeadingComponent } from "./heading.types";
import { getHeadingClass } from "./heading.utils";

const Heading: HeadingComponent = (props) => {
  const tag = () => `h${props.level}`;
  const classes = () => getHeadingClass(props.level);

  return (
    <Dynamic id={props.id} component={tag()} class={classes()}>
      {props.children}
    </Dynamic>
  );
};

export default Heading;
