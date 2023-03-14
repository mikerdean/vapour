import { nanoid } from "nanoid";
import { createResource } from "solid-js";

import { KodiRequest } from "../types";
import { QueryHook } from "./types";
import { useSocket } from "..";

export const createQueryHook = <TRequest, TResponse>(
  method: string,
  params: TRequest
): QueryHook<TRequest, TResponse> => {
  return (optionalParams) => {
    const { send } = useSocket();

    const request = (): KodiRequest<TRequest> => ({
      id: nanoid(),
      jsonrpc: "2.0",
      method,
      params: {
        ...params,
        ...(optionalParams && optionalParams()),
      },
    });

    const result = createResource<TResponse, KodiRequest<TRequest>>(
      request,
      send
    );

    return result;
  };
};
