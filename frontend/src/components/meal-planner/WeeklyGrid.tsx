"use client";

import type { ApiMealPlanEntry, DayOfWeek, MealType } from "@/types/meal-plan.types";
import { MealSlot } from "./MealSlot";

const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack"];

interface WeeklyGridProps {
  entries: ApiMealPlanEntry[];
  onRemove: (entryId: string) => void;
  onAdd: (day: DayOfWeek, mealType: MealType) => void;
}

export function WeeklyGrid({ entries, onRemove, onAdd }: WeeklyGridProps) {
  function getEntry(day: DayOfWeek, mealType: MealType) {
    return entries.find((e) => e.day === day && e.mealType === mealType);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr>
            <th className="w-24 pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide" />
            {DAYS.map((day) => (
              <th
                key={day}
                className="pb-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide"
              >
                {day.slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MEAL_TYPES.map((mealType) => (
            <tr key={mealType} className="border-t border-gray-100">
              <td className="py-2 pr-3 text-xs font-medium text-gray-500 whitespace-nowrap align-top pt-3">
                {mealType}
              </td>
              {DAYS.map((day) => (
                <td key={day} className="py-2 px-1 align-top">
                  <MealSlot
                    entry={getEntry(day, mealType)}
                    day={day}
                    mealType={mealType}
                    onRemove={onRemove}
                    onAdd={onAdd}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
