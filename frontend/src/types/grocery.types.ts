export type GroceryCategory =
  | 'Produce'
  | 'Meat & Protein'
  | 'Dairy'
  | 'Grains & Pasta'
  | 'Canned & Packaged'
  | 'Spices & Condiments'
  | 'Other';

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: GroceryCategory;
  estimatedCost: number;
  isPurchased: boolean;
  isInPantry: boolean;
  fromRecipes: string[];
  store?: string;
}
