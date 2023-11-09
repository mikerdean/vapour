import { nanoid } from "nanoid";
import { createResource } from "solid-js";

import { useSocket } from "../../components/context/socketProvider";
import type { KodiRequest } from "../types";
import { QueryHook, skipToken } from "./types";
import { serialize } from "../../utils/serialize";
import { DateTime } from "luxon";

type Cached<T> = {
  expires: string;
  value: T;
};

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const createHash = async (request: unknown): Promise<string> => {
  const json = serialize(request);
  const encoder = new TextEncoder();
  const buffer = encoder.encode(json);
  const hash = await window.crypto.subtle.digest("SHA-256", buffer);
  return toHex(hash);
};

export const createQueryHook = <TRequest, TResponse>(
  method: string,
  params: TRequest,
): QueryHook<TRequest, TResponse> => {
  const cache = new Map<string, Cached<TResponse>>();

  return (optionalParams) => {
    const [, { send }] = useSocket();

    const retrieve = async (
      request: KodiRequest<TRequest>,
    ): Promise<TResponse> => {
      const hash = await createHash(request.params);
      const cached = cache.get(hash);
      const now = DateTime.utc();

      if (cached) {
        const expiresBy = DateTime.fromISO(cached.expires);
        if (now < expiresBy) {
          return cached.value;
        }

        cache.delete(hash);
      }

      const value = await send<TRequest, TResponse>(request);

      const expires = now.plus({ minutes: 5 }).toISO();
      if (expires) {
        cache.set(hash, { expires, value });
      }

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
