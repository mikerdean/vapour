import { mergeProps } from "solid-js";

import type { ButtonComponent } from "./types";

const defaultProps: Partial<ButtonComponent> = {
  type: "button",
};

const Button: ButtonComponent = (props) => {
  const merged = mergeProps(defaultProps, props);

  return (
    <button
      class="bg-fuchsia-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-fuchsia-900 hover:bg-fuchsia-700 text-slate-100 px-3 py-2 rounded"
      classList={{ "disabled:opacity-50": props.disabled }}
      {...merged}
    >
      {merged.children}
    </button>
  );
};

export default Button;
