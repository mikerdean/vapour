import { Accessor, ResourceReturn } from "solid-js";

export type QueryHook<TRequest, TResponse> = (
  optionalParams?: Accessor<Partial<TRequest>>
) => ResourceReturn<TResponse>;
