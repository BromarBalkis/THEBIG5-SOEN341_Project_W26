// src/lib/apiClient.ts
import * as ApiMod from "./api";


export async function api(path: string, options: { method?: string; body?: any } = {}) {
  const mod: any = ApiMod as any;

  
  const candidate =
    mod.api ||            //our export function api
    mod.request ||        //our export function request(...)
    mod.client ||         //our export const client = ...
    mod.default;          //our export default ...

  if (!candidate) {
    throw new Error(
      "apiClient: src/lib/api.ts has no usable export. Open src/lib/api.ts and tell me what it exports."
    );
  }

  // scenario 1: candidate is a function like request(path, options)
  if (typeof candidate === "function") {
    return candidate(path, options);
  }

  // scenario 2: candidate is an object client with methods
  // then we Try: candidate.request / candidate.post / candidate.fetch
  if (candidate.request) return candidate.request(path, options);

  if (options.method?.toUpperCase() === "POST" && candidate.post) {
    return candidate.post(path, options.body);
  }

  if (candidate.fetch) return candidate.fetch(path, options);

  throw new Error(
    "apiClient: found an export in api.ts, but couldn't call it. Paste src/lib/api.ts exports section."
  );
}
