import { NowPlayingItem, NowPlayingMessage } from "./nowPlaying.types";

const isNowPlayingMessage = (item: unknown): item is NowPlayingMessage => {
  if (!item || typeof item !== "object") {
    return false;
  }

  return (
    "id" in item &&
    typeof item.id === "number" &&
    "type" in item &&
    typeof item.type === "string"
  );
};

export const createPlayingItem = async (
  item: unknown,
): Promise<NowPlayingItem | undefined> => {
  if (!isNowPlayingMessage(item)) {
    return;
  }

  switch (item.type) {
    case "movie":
      return;

    case "episode":
      return;

    case "song":
      return;

    default:
      return;
  }
};
