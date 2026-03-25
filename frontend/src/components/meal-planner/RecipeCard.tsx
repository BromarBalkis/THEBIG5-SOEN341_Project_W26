"use client";

import { Trash2 } from "lucide-react";
import type { ApiMealPlanEntry } from "@/types/meal-plan.types";

interface RecipeCardProps {
  entry: ApiMealPlanEntry;
  onRemove: (entryId: string) => void;
}

export function RecipeCard({ entry, onRemove }: RecipeCardProps) {
  const recipe = entry.recipe;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate leading-tight">
            {recipe?.title ?? "Unknown Recipe"}
          </p>
          {recipe?.prepTime && (
            <p className="text-xs text-gray-500 mt-0.5">{recipe.prepTime} min</p>
          )}
          {recipe?.nutritionCalories && (
            <p className="text-xs text-green-600 font-medium mt-0.5">
              {Math.round(recipe.nutritionCalories)} kcal
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(entry.id)}
          className="shrink-0 p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove meal"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}
