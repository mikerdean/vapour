import { nanoid } from "nanoid";
import { createResource } from "solid-js";

import { useSocket } from "../../components/context/socketProvider";
import type { KodiRequest } from "../types";
import { QueryHook, skipToken } from "./types";

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const createHash = async (request: unknown): Promise<string> => {
  const json = JSON.stringify(request);
  const encoder = new TextEncoder();
  const buffer = encoder.encode(json);
  const hash = await window.crypto.subtle.digest("SHA-256", buffer);
  return toHex(hash);
};

export const createQueryHook = <TRequest, TResponse>(
  method: string,
  params: TRequest,
): QueryHook<TRequest, TResponse> => {
  const cache = new Map<string, TResponse>();

  return (optionalParams) => {
    const [, { send }] = useSocket();

    const retrieve = async (
      request: KodiRequest<TRequest>,
    ): Promise<TResponse> => {
      const hash = await createHash(request.params);
      const valueInCache = cache.get(hash);
      if (valueInCache) {
        return valueInCache;
      }

      const value = await send<TRequest, TResponse>(request);
      cache.set(hash, value);
      return value;
    };

    const request = (): KodiRequest<TRequest> | null => {
      const newParams = optionalParams && optionalParams();
      if (newParams === skipToken) {
        return null;
      }

      return {
        id: nanoid(),
        jsonrpc: "2.0",
        method,
        params: {
          ...params,
          ...newParams,
        },
      };
    };

    const result = createResource<TResponse, KodiRequest<TRequest>>(
      request,
      retrieve,
    );

    return result;
  };
};
