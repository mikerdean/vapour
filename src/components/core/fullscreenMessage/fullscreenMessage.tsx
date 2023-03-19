import type { FullscreenMessageComponent } from "./types";

const FullscreenMessage: FullscreenMessageComponent = (props) => {
  return (
    <aside class="absolute w-full h-full" role={props.role}>
      <div class="flex items-center justify-center h-full">
        <div class="bg-slate-700 rounded-lg p-5 m-5 w-full max-w-md">
          {props.children}
        </div>
      </div>
    </aside>
  );
};

export default FullscreenMessage;
