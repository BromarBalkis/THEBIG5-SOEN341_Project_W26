"use client";

import { Plus } from "lucide-react";
import type { ApiMealPlanEntry, DayOfWeek, MealType } from "@/types/meal-plan.types";
import { RecipeCard } from "./RecipeCard";

interface MealSlotProps {
  entry: ApiMealPlanEntry | undefined;
  day: DayOfWeek;
  mealType: MealType;
  onRemove: (entryId: string) => void;
  onAdd: (day: DayOfWeek, mealType: MealType) => void;
}

export function MealSlot({ entry, day, mealType, onRemove, onAdd }: MealSlotProps) {
  if (entry) {
    return <RecipeCard entry={entry} onRemove={onRemove} />;
  }

  return (
    <button
      onClick={() => onAdd(day, mealType)}
      className="w-full h-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-green-400 hover:text-green-500 hover:bg-green-50 transition-colors"
      aria-label={`Add ${mealType} on ${day}`}
    >
      <Plus size={14} />
    </button>
  );
}
