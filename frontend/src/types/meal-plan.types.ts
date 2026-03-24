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

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyNutrition extends NutritionTotals {
  day: DayOfWeek;
}

// Shape returned by the backend API (flat nutrition fields)
export interface ApiRecipe {
  id: string;
  title: string;
  prepTime: number;
  difficulty: string;
  dietaryTags: string[];
  nutritionCalories: number | null;
  nutritionProtein: number | null;
  nutritionCarbs: number | null;
  nutritionFat: number | null;
}

export interface ApiMealPlanEntry {
  id: string;
  recipeId: string;
  mealPlanId: string;
  day: DayOfWeek;
  mealType: MealType;
  recipe: ApiRecipe | null;
}

export interface ApiWeeklyMealPlan {
  id?: string;
  weekOf: string;
  entries: ApiMealPlanEntry[];
}
