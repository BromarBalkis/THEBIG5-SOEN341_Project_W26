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
    <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm h-12 overflow-hidden">
      <div className="flex items-center justify-between gap-1 h-full">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate leading-tight">
            {recipe?.title ?? "Unknown Recipe"}
          </p>
          <p className="text-xs text-gray-500 truncate leading-tight">
            {[
              recipe?.prepTime ? `${recipe.prepTime} min` : null,
              recipe?.nutritionCalories
                ? `${Math.round(recipe.nutritionCalories)} kcal`
                : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
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
