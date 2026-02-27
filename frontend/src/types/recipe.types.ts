import type { DietaryPreference } from './user.types';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Step {
  id: string;
  order: number;
  description: string;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  userId: string;
  title: string;
  description: string;
  image?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  costPerServing: number;
  dietaryTags: DietaryPreference[];
  ingredients: Ingredient[];
  steps: Step[];
  nutrition?: Nutrition;
  createdAt: Date;
  updatedAt: Date;
}
