import { createSignal, onCleanup, onMount, Show } from "solid-js";

import { useSocket } from "../context/socketProvider";
import { NowPlayingComponent } from "./nowPlaying.types";

const NowPlaying: NowPlayingComponent = () => {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [, { subscribe }] = useSocket();

  onMount(() => {
    const onPlaySubscribe = subscribe("Player.OnPlay", () => {
      setIsPlaying(true);
    });

    const onStopUnsubscribe = subscribe("Player.OnStop", () => {
      setIsPlaying(false);
    });

    onCleanup(() => {
      onPlaySubscribe();
      onStopUnsubscribe();
    });
  });

  return (
    <Show when={isPlaying()}>
      <aside class="fixed bottom-16 border border-red-500 w-full h-16">
        now playing
      </aside>
    </Show>
  );
};

export default NowPlaying;
