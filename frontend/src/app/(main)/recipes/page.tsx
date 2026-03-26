"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Clock, Flame, DollarSign, Tag, Pencil, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const DIETARY_TAGS = [
  "Vegan",
  "Vegetarian",
  "Keto",
  "Gluten-Free",
  "Dairy-Free",
  "Paleo",
  "Low-Carb",
  "High-Protein",
  "Nut-Free",
  "Halal",
  "Low-Calorie",
  "Pescatarian",
];

interface Recipe {
  id: string;
  title: string;
  description?: string;
  prepTime: number;
  difficulty: string;
  cost: number;
  dietaryTags?: string[];
}

export default function RecipesPage() {
  const router = useRouter();
  const { recipes: mockRecipes } = useApp();

  const mockMapped = useMemo<Recipe[]>(
    () =>
      mockRecipes.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        prepTime: r.prepTime,
        difficulty: r.difficulty,
        cost: r.costPerServing,
        dietaryTags: r.dietaryTags as string[],
      })),
    [mockRecipes]
  );

  const [apiRecipes, setApiRecipes] = useState<Recipe[] | null>(null);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [tag, setTag] = useState("");

  // While fetching, show nothing — avoids flash of mock data for logged-in users
  const allRecipes = fetching ? [] : (apiRecipes ?? mockMapped);

  const recipes = useMemo(() => {
    return allRecipes.filter((r) => {
      if (
        search &&
        !r.title.toLowerCase().includes(search.toLowerCase()) &&
        !(r.description ?? "").toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (difficulty && r.difficulty !== difficulty) return false;
      if (maxTime && r.prepTime > Number(maxTime)) return false;
      if (maxCost && r.cost > Number(maxCost)) return false;
      if (tag && !(r.dietaryTags ?? []).includes(tag)) return false;
      return true;
    });
  }, [allRecipes, search, difficulty, maxTime, maxCost, tag]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setFetching(false); return; }
    fetch(`${API_URL}/api/recipes`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setApiRecipes(data); })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this recipe?")) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setApiRecipes((prev) =>
        prev ? prev.filter((r) => r.id !== id) : mockMapped.filter((r) => r.id !== id)
      );
      return;
    }
    const res = await fetch(`${API_URL}/api/recipes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setApiRecipes((prev) => (prev ? prev.filter((r) => r.id !== id) : null));
    }
  };

  const difficultyColor: Record<string, string> = {
    Easy: "text-green-600 bg-green-50",
    Medium: "text-amber-600 bg-amber-50",
    Hard: "text-red-600 bg-red-50",
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Recipes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => router.push("/recipes/create")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Create Recipe
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search recipes..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Difficulty */}
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Max Time */}
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              min="0"
              placeholder="Max Time (min)"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              value={maxTime}
              onChange={(e) => setMaxTime(e.target.value < "0" ? "0" : e.target.value)}
            />
          </div>

          {/* Dietary Tag */}
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="">All Dietary Tags</option>
            {DIETARY_TAGS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipe Grid */}
      {recipes.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-base">No recipes found.</p>
          <p className="text-sm mt-1">Try adjusting your filters or create a new recipe.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              {/* Title + difficulty */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-semibold text-gray-900 leading-snug">{recipe.title}</h2>
                {recipe.difficulty && (
                  <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[recipe.difficulty] ?? "text-gray-600 bg-gray-100"}`}>
                    {recipe.difficulty}
                  </span>
                )}
              </div>

              {/* Description */}
              {recipe.description && (
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{recipe.description}</p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-gray-400" />
                  {recipe.prepTime} min
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={12} className="text-gray-400" />
                  {recipe.cost.toFixed(2)}
                </span>
              </div>

              {/* Dietary tags */}
              {(recipe.dietaryTags ?? []).length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {(recipe.dietaryTags ?? []).map((t) => (
                    <span key={t} className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-1 border-t border-gray-100 mt-auto">
                <Link
                  href={`/recipes/${recipe.id}/edit`}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <Pencil size={12} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
