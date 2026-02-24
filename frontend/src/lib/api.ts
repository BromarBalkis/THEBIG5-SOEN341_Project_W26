import { getToken } from "./auth";

const API_BASE = "http://localhost:3000";

async function readError(res: Response) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const j = await res.json().catch(() => null);
    if (j?.error) return j.error;
    return JSON.stringify(j);
  }
  return await res.text();
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const msg = await readError(res);
    throw new Error(msg || `Request failed (${res.status})`);
  }

  // handle empty responses
  if (res.status === 204) return undefined as T;
  return res.json();
}

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string;
  prepTimeMin: number;
  difficulty: Difficulty;
  cost: number;
  dietaryTags: string[];
  createdAt?: string;
  updatedAt?: string;
};

// Auth
export async function login(email: string, password: string): Promise<string> {
  const data = await api<any>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const token = data?.token || data?.accessToken;
  if (!token) throw new Error("Login did not return a token");
  return token;
}

// Recipes
export function listRecipes(params: {
  q?: string;
  timeMax?: string;
  costMax?: string;
  difficulty?: string;
  tag?: string;
}) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.timeMax) sp.set("timeMax", params.timeMax);
  if (params.costMax) sp.set("costMax", params.costMax);
  if (params.difficulty) sp.set("difficulty", params.difficulty);
  if (params.tag) sp.set("tag", params.tag);
  const qs = sp.toString();
  return api<Recipe[]>(`/recipes${qs ? `?${qs}` : ""}`);
}

export function createRecipe(body: Omit<Recipe, "id" | "createdAt" | "updatedAt">) {
  return api<Recipe>("/recipes", { method: "POST", body: JSON.stringify(body) });
}

export function getRecipe(id: string) {
  return api<Recipe>(`/recipes/${id}`);
}

export function updateRecipe(id: string, body: Partial<Omit<Recipe, "id" | "createdAt" | "updatedAt">>) {
  return api<Recipe>(`/recipes/${id}`, { method: "PUT", body: JSON.stringify(body) });
}

export function deleteRecipe(id: string) {
  return api<{ ok: true }>(`/recipes/${id}`, { method: "DELETE" });
}