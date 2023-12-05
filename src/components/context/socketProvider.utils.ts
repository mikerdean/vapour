import { serialize } from "../../utils/serialize";

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export const createHash = async function <T>(request: T): Promise<string> {
  const json = serialize(request);
  const encoder = new TextEncoder();
  const buffer = encoder.encode(json);
  const hash = await window.crypto.subtle.digest("SHA-256", buffer);
  return toHex(hash);
};
