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
  const [, { subscribe, getActivePlayers, getPlayerItem, ...methods }] =
    useSocket();

  const [state, setState] = createStore<PlayerStore>({
    id: undefined,
    item: undefined,
    speed: 1,
    status: "stopped",
  });

  const getCurrentPlayingItemOnMount = async (): Promise<void> => {
    const players = await getActivePlayers();
    if (players.length === 0) {
      return;
    }

    const { item } = await getPlayerItem(players[0].playerid);
    const playingItem = await createPlayingItem(methods, item);
    setState({ item: playingItem });
  };

  onMount(() => {
    getCurrentPlayingItemOnMount();

    const subscriptions = [
      subscribe("Player.OnPlay", async (message) => {
        const item = await createPlayingItem(methods, message.data.item);
        setState({
          id: message.data.player.playerid,
          item: item,
          status: "playing",
          speed: message.data.player.speed,
        });
      }),
      subscribe("Player.OnStop", () => {
        setState({
          id: undefined,
          item: undefined,
          status: "stopped",
        });
      }),
      subscribe("Player.OnPause", () => {
        setState({ status: "paused" });
      }),
      subscribe("Player.OnResume", (message) => {
        setState({
          status: "playing",
          speed: message.data.player.speed,
        });
      }),
      subscribe("Player.OnSpeedChanged", (message) => {
        setState({ speed: message.data.player.speed });
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
