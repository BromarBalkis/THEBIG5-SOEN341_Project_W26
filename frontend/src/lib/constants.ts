import type {
  DietaryPreference,
  MealType,
  DayOfWeek,
  GroceryCategory,
} from '@/types';

export const DIETARY_OPTIONS: DietaryPreference[] = [
  'Vegetarian',
  'Vegan',
  'Keto',
  'Paleo',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb',
  'Halal',
  'Kosher',
  'None',
];

export const COMMON_ALLERGIES: string[] = [
  'Nuts',
  'Dairy',
  'Eggs',
  'Soy',
  'Gluten',
  'Fish',
  'Shellfish',
  'Wheat',
  'Sesame',
  'Mustard',
];

export const MEAL_TYPES: Array<{ value: MealType; emoji: string }> = [
  { value: 'Breakfast', emoji: '🌅' },
  { value: 'Lunch', emoji: '☀️' },
  { value: 'Dinner', emoji: '🌙' },
  { value: 'Snack', emoji: '🍎' },
];

export const DAYS_OF_WEEK: Array<{ full: DayOfWeek; short: string }> = [
  { full: 'Monday', short: 'Mon' },
  { full: 'Tuesday', short: 'Tue' },
  { full: 'Wednesday', short: 'Wed' },
  { full: 'Thursday', short: 'Thu' },
  { full: 'Friday', short: 'Fri' },
  { full: 'Saturday', short: 'Sat' },
  { full: 'Sunday', short: 'Sun' },
];

export const DIFFICULTY_OPTIONS: Array<{
  value: 'Easy' | 'Medium' | 'Hard';
  color: string;
  bgColor: string;
}> = [
  {
    value: 'Easy',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    value: 'Medium',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    value: 'Hard',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
];

export const INGREDIENT_UNITS: string[] = [
  'cup',
  'tbsp',
  'tsp',
  'g',
  'kg',
  'oz',
  'lb',
  'ml',
  'l',
  'piece',
  'slice',
  'clove',
];

export const GROCERY_CATEGORIES: Array<{
  value: GroceryCategory;
  emoji: string;
}> = [
  { value: 'Produce', emoji: '🥬' },
  { value: 'Meat & Protein', emoji: '🍗' },
  { value: 'Dairy', emoji: '🥛' },
  { value: 'Grains & Pasta', emoji: '🍝' },
  { value: 'Canned & Packaged', emoji: '🥫' },
  { value: 'Spices & Condiments', emoji: '🧂' },
  { value: 'Other', emoji: '📦' },
];

export const TIME_FILTER_OPTIONS: Array<{
  label: string;
  value: string;
  maxMinutes: number;
}> = [
  { label: 'All', value: 'all', maxMinutes: 999 },
  { label: 'Under 15 min', value: '15', maxMinutes: 15 },
  { label: '15-30 min', value: '30', maxMinutes: 30 },
  { label: '30-60 min', value: '60', maxMinutes: 60 },
  { label: 'Over 60 min', value: '60+', maxMinutes: 999 },
];

export const COST_FILTER_OPTIONS: Array<{
  label: string;
  value: string;
  min: number;
  max: number;
}> = [
  { label: 'All', value: 'all', min: 0, max: 999 },
  { label: '$ (Under $5)', value: '$', min: 0, max: 5 },
  { label: '$$ ($5-$15)', value: '$$', min: 5, max: 15 },
  { label: '$$$ (Over $15)', value: '$$$', min: 15, max: 999 },
];
