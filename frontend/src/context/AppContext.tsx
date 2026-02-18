'use client';

import React, { ReactNode, createContext, useContext } from 'react';
import { Recipe, MealPlanEntry, GroceryItem, WeeklyMealPlan } from '@/types';
import { mockRecipes, mockMealPlan, mockGroceryList } from '@/lib/mockData';

interface AppContextType {
  recipes: Recipe[];
  mealPlan: WeeklyMealPlan;
  groceryList: GroceryItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const value: AppContextType = {
    recipes: mockRecipes,
    mealPlan: mockMealPlan,
    groceryList: mockGroceryList,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
