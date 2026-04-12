import type {
  ApiMealPlanEntry,
  ApiRecipe,
  NutritionTotals,
  DailyNutrition,
  DayOfWeek,
} from "@/types/meal-plan.types";
import type { Recipe } from "@/types/recipe.types";

export const DAYS_OF_WEEK: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** Map a frontend Recipe (nested nutrition object) to the flat ApiRecipe shape the backend returns. */
export function toApiRecipe(r: Recipe): ApiRecipe {
  return {
    id: r.id,
    title: r.title,
    prepTime: r.prepTime,
    difficulty: r.difficulty,
    dietaryTags: r.dietaryTags as string[],
    nutritionCalories: r.nutrition?.calories ?? null,
    nutritionProtein: r.nutrition?.protein ?? null,
    nutritionCarbs: r.nutrition?.carbs ?? null,
    nutritionFat: r.nutrition?.fat ?? null,
  };
}

/** Sum nutrition across all entries for a week. Null fields count as 0. */
export function computeWeeklyTotals(entries: ApiMealPlanEntry[]): NutritionTotals {
  return entries.reduce(
    (acc, e) => {
      acc.calories += e.recipe?.nutritionCalories ?? 0;
      acc.protein += e.recipe?.nutritionProtein ?? 0;
      acc.carbs += e.recipe?.nutritionCarbs ?? 0;
      acc.fat += e.recipe?.nutritionFat ?? 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

/** Break nutrition down by day of week. Always returns all 7 days in Monday→Sunday order,
 *  with zeros for days that have no entries. */
export function computeDailyBreakdown(entries: ApiMealPlanEntry[]): DailyNutrition[] {
  return DAYS_OF_WEEK.map((day) => {
    const dayEntries = entries.filter((e) => e.day === day);
    return dayEntries.reduce(
      (acc, e) => {
        acc.calories += e.recipe?.nutritionCalories ?? 0;
        acc.protein += e.recipe?.nutritionProtein ?? 0;
        acc.carbs += e.recipe?.nutritionCarbs ?? 0;
        acc.fat += e.recipe?.nutritionFat ?? 0;
        return acc;
      },
      { day, calories: 0, protein: 0, carbs: 0, fat: 0 } as DailyNutrition
    );
  });
}
