import { createContext, onCleanup, onMount, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import type {
  PlayerContextType,
  PlayerProviderComponent,
  PlayerStore,
} from "./playerProvider.types";
import { createPlayingItem } from "./playerProvider.utils";
import { useSocket } from "./socketProvider";

const PlayerContext = createContext<PlayerContextType>([{} as PlayerStore]);

const PlayerProvider: PlayerProviderComponent = (props) => {
  const [, methods] = useSocket();

  const [state, setState] = createStore<PlayerStore>({
    playingItem: undefined,
  });

  const getCurrentPlayingItemOnMount = async (): Promise<void> => {
    const players = await methods.getActivePlayers();
    if (players.length === 0) {
      return;
    }

    const { item } = await methods.getPlayerItem(players[0].playerid);
    const playingItem = await createPlayingItem(methods, item);
    setState("playingItem", playingItem);
  };

  onMount(() => {
    getCurrentPlayingItemOnMount();

    const subscriptions = [
      methods.subscribe("Player.OnPlay", async (message) => {
        const item = await createPlayingItem(methods, message.data.item);
        setState("playingItem", item);
      }),
      methods.subscribe("Player.OnStop", () => {
        setState("playingItem", undefined);
      }),
    ];

    onCleanup(() => {
      for (const unsubcribe of subscriptions) {
        unsubcribe();
      }
    });
  });

  return (
    <PlayerContext.Provider value={[state]}>
      {props.children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export default PlayerProvider;
export { usePlayer };
