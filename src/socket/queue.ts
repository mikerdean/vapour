import type { KodiMessageEvent } from "./types";

const messageMap = new Map<string, KodiMessageEvent>();

const addToQueue = (id: string, listener: KodiMessageEvent): void => {
  messageMap.set(id, listener);
};

const dequeue = (id: string): KodiMessageEvent | undefined => {
  const value = messageMap.get(id);
  if (value) {
    messageMap.delete(id);
  }
  return value;
};

const removeFromQueue = (id: string): boolean => {
  return messageMap.delete(id);
};

export { addToQueue, dequeue, removeFromQueue };
