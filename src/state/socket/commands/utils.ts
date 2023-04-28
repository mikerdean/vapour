import { nanoid } from "nanoid";
import { createResource } from "solid-js";

import { useSocket } from "../../../components/context/socketProvider";
import { KodiRequest } from "../types";
import { QueryHook } from "./types";

export const createQueryHook = <TRequest, TResponse>(
  method: string,
  params: TRequest
): QueryHook<TRequest, TResponse> => {
  return (optionalParams) => {
    const [, { send }] = useSocket();

    const request = (): KodiRequest<TRequest> | null => {
      const newParams = optionalParams && optionalParams();
      if (newParams === null) {
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
      send
    );

    return result;
  };
};
