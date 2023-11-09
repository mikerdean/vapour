import type { Accessor, ResourceReturn } from "solid-js";

export const skipToken = Symbol("socket.query.skipToken");

export type Cached<T> = {
  expires: string;
  value: T;
};

export type QueryHook<TRequest, TResponse> = (
  optionalParams?: Accessor<Partial<TRequest> | typeof skipToken>,
) => ResourceReturn<TResponse>;
