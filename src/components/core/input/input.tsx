import { Show, createUniqueId } from "solid-js";

import { InputComponent } from "./types";

const Input: InputComponent = (props) => {
  const id = createUniqueId();

  return (
    <>
      <Show when={props.label}>
        <label for={id} class="block mb-1">
          {props.label}
        </label>
      </Show>
      <input
        class="px-2 py-1 w-full rounded border text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-fuchsia-900"
        classList={{
          "bg-slate-400": !props.error,
          "bg-fuchsia-200": !!props.error,
          "border-fuchsia-500": !!props.error,
          "border-slate-300": !props.error,
        }}
        id={id}
        {...props}
      />
      <Show when={props.error}>
        <span class="text-xs text-slate-300">{props.error}</span>
      </Show>
    </>
  );
};

export default Input;
