export type DietaryPreference =
  | "Vegetarian"
  | "Vegan"
  | "Keto"
  | "Paleo"
  | "Gluten-Free"
  | "Dairy-Free"
  | "Low-Carb"
  | "Halal"
  | "Kosher"
  | "None";

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  dietaryPreferences: string[];
  allergies: string[];
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
