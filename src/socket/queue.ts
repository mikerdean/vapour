import type { KodiMessageEvent } from "./types";

const messageMap = new Map<string, KodiMessageEvent>();

const addToQueue = (id: string, listener: KodiMessageEvent): void => {
  messageMap.set(id, listener);
};

const getFromQueue = (id: string): KodiMessageEvent | undefined => {
  return messageMap.get(id);
};

const removeFromQueue = (id: string): boolean => {
  return messageMap.delete(id);
};

export { addToQueue, getFromQueue, removeFromQueue };
