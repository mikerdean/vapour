import { nanoid } from "nanoid";
import { createResource } from "solid-js";

import { useSocket } from "../../components/context/socketProvider";
import type { KodiRequest } from "../types";
import { QueryHook, skipToken } from "./types";

export const createQueryHook = <TRequest, TResponse>(
  method: string,
  params: TRequest,
): QueryHook<TRequest, TResponse> => {
  return (optionalParams) => {
    const [, { send }] = useSocket();

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
      send,
    );

    return result;
  };
};
