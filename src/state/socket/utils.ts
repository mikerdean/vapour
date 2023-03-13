import { nanoid } from "nanoid";

import { KodiRequest, KodiResponse } from "./types/message";

export const createRequest = <TRequest>(
  method: string,
  params: TRequest
): KodiRequest<TRequest> => ({
  id: nanoid(),
  jsonrpc: "2.0",
  method,
  params,
});

export const createResponse = <TResponse>(
  result: TResponse
): KodiResponse<TResponse> => ({
  id: nanoid(),
  jsonrpc: "2.0",
  result,
});
