import type { Accessor, ResourceReturn } from "solid-js";

export const skipToken = Symbol("socket.query.skipToken");

export type QueryHook<TRequest, TResponse> = (
  optionalParams?: Accessor<Partial<TRequest> | typeof skipToken>
) => ResourceReturn<TResponse>;
