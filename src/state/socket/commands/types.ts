import type { Accessor, ResourceReturn } from "solid-js";

export type QueryHook<TRequest, TResponse> = (
  optionalParams?: Accessor<Partial<TRequest> | null>
) => ResourceReturn<TResponse>;
