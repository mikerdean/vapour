import { createContext, onCleanup, onMount, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import type { NotificationItem } from "../../socket/types/notifications";
import type {
  PlayerContextType,
  PlayerProviderComponent,
  PlayerStore,
} from "./playerProvider.types";
import { createPlayingItem } from "./playerProvider.utils";
import { useSocket } from "./socketProvider";

const PlayerContext = createContext<PlayerContextType>([{} as PlayerStore]);

const PlayerProvider: PlayerProviderComponent = (props) => {
  const [
    ,
    {
      subscribe,
      getActivePlayers,
      getPlayerItem,
      getPlayerProperties,
      ...methods
    },
  ] = useSocket();

  const [state, setState] = createStore<PlayerStore>({
    id: undefined,
    item: undefined,
    speed: 1,
    status: "stopped",
  });

  const setupPlayer = async (
    id: number,
    item: NotificationItem,
  ): Promise<void> => {
    const playingItem = await createPlayingItem(methods, item);

    setState({
      id,
      item: playingItem,
      status: "playing",
    });
  };

  const getCurrentProperties = async (id: number) => {
    const { speed } = await getPlayerProperties(id);

    setState({
      speed,
    });
  };

  const getCurrentPlayingItemOnMount = async (): Promise<void> => {
    const players = await getActivePlayers();
    if (players.length === 0) {
      return;
    }

    const { playerid } = players[0];
    const { item } = await getPlayerItem(playerid);

    await Promise.all([
      setupPlayer(playerid, item),
      getCurrentProperties(playerid),
    ]);
  };

  onMount(() => {
    getCurrentPlayingItemOnMount();

    const subscriptions = [
      subscribe("Player.OnPlay", (message) => {
        setupPlayer(message.data.player.playerid, message.data.item);
      }),
      subscribe("Player.OnAVStart", (message) => {
        getCurrentProperties(message.data.player.playerid);
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
