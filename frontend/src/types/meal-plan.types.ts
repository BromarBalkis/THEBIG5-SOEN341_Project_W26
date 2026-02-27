import type { Recipe } from './recipe.types';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface MealPlanEntry {
  id: string;
  recipeId: string;
  recipe: Recipe;
  day: DayOfWeek;
  mealType: MealType;
  weekOf: string;
}

export interface WeeklyMealPlan {
  weekOf: string;
  entries: MealPlanEntry[];
}
