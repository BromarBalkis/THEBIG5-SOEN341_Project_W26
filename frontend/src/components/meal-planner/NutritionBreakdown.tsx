"use client";

import type { NutritionTotals, DailyNutrition } from "@/types/meal-plan.types";
import { MacroPieChart } from "./MacroPieChart";
import { DailyCaloriesBarChart } from "./DailyCaloriesBarChart";

interface NutritionBreakdownProps {
  weeklyTotals: NutritionTotals;
  dailyBreakdown: DailyNutrition[];
}

export function NutritionBreakdown({ weeklyTotals, dailyBreakdown }: NutritionBreakdownProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Weekly Nutrition Breakdown</h2>

      {/* Summary totals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <NutritionStat label="Calories" value={Math.round(weeklyTotals.calories)} unit="kcal" color="text-orange-600" />
        <NutritionStat label="Protein" value={Math.round(weeklyTotals.protein)} unit="g" color="text-blue-600" />
        <NutritionStat label="Carbs" value={Math.round(weeklyTotals.carbs)} unit="g" color="text-amber-600" />
        <NutritionStat label="Fat" value={Math.round(weeklyTotals.fat)} unit="g" color="text-red-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Macro Distribution</h3>
          <MacroPieChart totals={weeklyTotals} />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Daily Calories</h3>
          <DailyCaloriesBarChart dailyBreakdown={dailyBreakdown} />
        </div>
      </div>
    </div>
  );
}

function NutritionStat({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
      <p className="text-xs text-gray-400">{unit}</p>
    </div>
  );
}
