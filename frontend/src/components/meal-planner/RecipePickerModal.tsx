"use client";

import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useApp } from "@/context/AppContext";
import type { DayOfWeek, MealType } from "@/types/meal-plan.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BackendRecipe {
  id: string;
  title: string;
  prepTime: number;
  difficulty: string;
  dietaryTags: string[];
  nutritionCalories: number | null;
}

interface RecipePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: DayOfWeek | null;
  mealType: MealType | null;
  onSelect: (recipeId: string, day: DayOfWeek, mealType: MealType) => Promise<void>;
}

export function RecipePickerModal({
  isOpen,
  onClose,
  day,
  mealType,
  onSelect,
}: RecipePickerModalProps) {
  const { recipes: mockRecipes } = useApp();
  const [apiRecipes, setApiRecipes] = useState<BackendRecipe[]>([]);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState<string | null>(null);

  // Map mock Recipe type (nested nutrition) to the flat BackendRecipe shape
  const mockMapped = useMemo<BackendRecipe[]>(
    () =>
      mockRecipes.map((r) => ({
        id: r.id,
        title: r.title,
        prepTime: r.prepTime,
        difficulty: r.difficulty,
        dietaryTags: r.dietaryTags as string[],
        nutritionCalories: r.nutrition?.calories ?? null,
      })),
    [mockRecipes]
  );

  // Use real API recipes when available, otherwise fall back to mock data
  const recipes = apiRecipes.length > 0 ? apiRecipes : mockMapped;

  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_URL}/api/recipes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setApiRecipes(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, [isOpen]);

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSelect(recipeId: string) {
    if (!day || !mealType) return;
    setIsAdding(recipeId);
    await onSelect(recipeId, day, mealType);
    setIsAdding(null);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={day && mealType ? `Add ${mealType} — ${day}` : "Add Meal"}
      size="lg"
    >
      <div className="mb-4 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-6">
          {recipes.length === 0 ? "No recipes yet. Create some first!" : "No recipes match your search."}
        </p>
      )}

      <div className="space-y-2">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">{recipe.title}</p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-gray-500">{recipe.prepTime} min</span>
                <span className="text-xs text-gray-500">{recipe.difficulty}</span>
                {recipe.nutritionCalories && (
                  <span className="text-xs text-green-600 font-medium">
                    {Math.round(recipe.nutritionCalories)} kcal
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => handleSelect(recipe.id)}
              disabled={isAdding === recipe.id}
              className="px-3 py-1.5 text-xs font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isAdding === recipe.id ? "Adding…" : "Add"}
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
