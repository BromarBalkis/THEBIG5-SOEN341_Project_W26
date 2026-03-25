"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMealPlan } from "@/context/MealPlanContext";
import { useToast } from "@/context/ToastContext";
import { WeeklyGrid, NutritionBreakdown, RecipePickerModal } from "@/components/meal-planner";
import type { DayOfWeek, MealType } from "@/types/meal-plan.types";

function formatWeekLabel(weekOf: string): string {
  const start = new Date(weekOf + "T00:00:00");
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} – ${fmt(end)}, ${start.getFullYear()}`;
}

export default function MealPlannerPage() {
  const {
    mealPlan,
    isLoading,
    currentWeekOf,
    weeklyTotals,
    dailyBreakdown,
    goToPrevWeek,
    goToNextWeek,
    addEntry,
    removeEntry,
  } = useMealPlan();

  const { showToast } = useToast();

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerDay, setPickerDay] = useState<DayOfWeek | null>(null);
  const [pickerMealType, setPickerMealType] = useState<MealType | null>(null);

  function handleAddClick(day: DayOfWeek, mealType: MealType) {
    setPickerDay(day);
    setPickerMealType(mealType);
    setPickerOpen(true);
  }

  async function handleRecipeSelect(recipeId: string, day: DayOfWeek, mealType: MealType) {
    const result = await addEntry(recipeId, day, mealType);
    if (!result.ok) {
      showToast(result.message ?? "Failed to add meal", "error");
    } else {
      showToast("Meal added!", "success");
    }
  }

  async function handleRemove(entryId: string) {
    await removeEntry(entryId);
    showToast("Meal removed", "success");
  }

  return (
    <div className="max-w-7xl mx-auto py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meal Planner</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {mealPlan?.entries.length ?? 0} meal{(mealPlan?.entries.length ?? 0) !== 1 ? "s" : ""} planned this week
          </p>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrevWeek}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[180px] text-center">
            {formatWeekLabel(currentWeekOf)}
          </span>
          <button
            onClick={goToNextWeek}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next week"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            Loading meal plan…
          </div>
        ) : (
          <WeeklyGrid
            entries={mealPlan?.entries ?? []}
            onRemove={handleRemove}
            onAdd={handleAddClick}
          />
        )}
      </div>

      {/* Nutrition Breakdown */}
      <NutritionBreakdown
        weeklyTotals={weeklyTotals}
        dailyBreakdown={dailyBreakdown}
      />

      {/* Recipe Picker Modal */}
      <RecipePickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        day={pickerDay}
        mealType={pickerMealType}
        onSelect={handleRecipeSelect}
      />
    </div>
  );
}
