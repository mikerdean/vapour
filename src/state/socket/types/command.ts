import { KodiRequest, KodiResponse } from "./message";

export type KodiCommand<TRequest, TResponse> = [
  KodiRequest<TRequest>,
  KodiResponse<TResponse>
];
