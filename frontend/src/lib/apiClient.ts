// src/lib/apiClient.ts
import * as ApiMod from "./api";

/**
 * This adapter tries to use whatever your existing api.ts exports,
 * without breaking it. It exposes a named export: api(path, options)
 */
export async function api(path: string, options: { method?: string; body?: any } = {}) {
  const mod: any = ApiMod as any;

  // Common patterns your api.ts might already use
  const candidate =
    mod.api ||            // export function api(...)
    mod.request ||        // export function request(...)
    mod.client ||         // export const client = ...
    mod.default;          // export default ...

  if (!candidate) {
    throw new Error(
      "apiClient: src/lib/api.ts has no usable export. Open src/lib/api.ts and tell me what it exports."
    );
  }

  // Case 1: candidate is a function like request(path, options)
  if (typeof candidate === "function") {
    return candidate(path, options);
  }

  // Case 2: candidate is an object client with methods
  // Try: candidate.request / candidate.post / candidate.fetch
  if (candidate.request) return candidate.request(path, options);

  if (options.method?.toUpperCase() === "POST" && candidate.post) {
    return candidate.post(path, options.body);
  }

  if (candidate.fetch) return candidate.fetch(path, options);

  throw new Error(
    "apiClient: found an export in api.ts, but couldn't call it. Paste src/lib/api.ts exports section."
  );
}
