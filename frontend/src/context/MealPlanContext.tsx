"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type { Recipe } from "@/types/recipe.types";
import type {
  ApiWeeklyMealPlan,
  ApiMealPlanEntry,
  ApiRecipe,
  DayOfWeek,
  MealType,
  NutritionTotals,
  DailyNutrition,
} from "@/types/meal-plan.types";
import { useApp } from "@/context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const DAYS_OF_WEEK: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getMondayOfWeek(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().split("T")[0];
}

function shiftWeek(weekOf: string, direction: 1 | -1): string {
  const d = new Date(weekOf + "T00:00:00");
  d.setDate(d.getDate() + direction * 7);
  return d.toISOString().split("T")[0];
}

function toApiRecipe(r: Recipe): ApiRecipe {
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

export interface MealPlanContextType {
  mealPlan: ApiWeeklyMealPlan | null;
  isLoading: boolean;
  currentWeekOf: string;
  weeklyTotals: NutritionTotals;
  dailyBreakdown: DailyNutrition[];
  navigateToWeek(weekOf: string): void;
  goToPrevWeek(): void;
  goToNextWeek(): void;
  addEntry(
    recipeId: string,
    day: DayOfWeek,
    mealType: MealType
  ): Promise<{ ok: boolean; message?: string }>;
  removeEntry(entryId: string): Promise<void>;
  refreshPlan(): Promise<void>;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(
  undefined
);

export function MealPlanProvider({ children }: { children: ReactNode }) {
  const { recipes: mockRecipes, mealPlan: mockPlan } = useApp();

  const [mealPlan, setMealPlan] = useState<ApiWeeklyMealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeekOf, setCurrentWeekOf] = useState<string>(() =>
    getMondayOfWeek(new Date())
  );

  // ── helpers ──────────────────────────────────────────────────────────────

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /** Build an empty plan shell for a given week */
  const emptyPlan = useCallback(
    (weekOf: string): ApiWeeklyMealPlan => ({ weekOf, entries: [] }),
    []
  );

  /** Return the mock plan if it matches the requested week, else empty */
  const mockPlanForWeek = useCallback(
    (weekOf: string): ApiWeeklyMealPlan => {
      if (weekOf !== mockPlan.weekOf) return emptyPlan(weekOf);
      return {
        weekOf: mockPlan.weekOf,
        entries: mockPlan.entries.map((e) => ({
          id: e.id,
          recipeId: e.recipeId,
          mealPlanId: "mock",
          day: e.day,
          mealType: e.mealType,
          recipe: toApiRecipe(e.recipe),
        })),
      };
    },
    [mockPlan, emptyPlan]
  );

  // ── fetch (API mode) ──────────────────────────────────────────────────────

  const fetchPlan = useCallback(
    async (weekOf: string) => {
      const token = getToken();
      if (!token) {
        // No token → seed from mock data
        setMealPlan(mockPlanForWeek(weekOf));
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/meal-plans?weekOf=${weekOf}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setMealPlan(await res.json());
        }
      } catch (err) {
        console.error("Failed to fetch meal plan:", err);
        // API unreachable → fall back to mock
        setMealPlan(mockPlanForWeek(weekOf));
      } finally {
        setIsLoading(false);
      }
    },
    [mockPlanForWeek]
  );

  useEffect(() => {
    fetchPlan(currentWeekOf);
  }, [currentWeekOf, fetchPlan]);

  const refreshPlan = useCallback(
    () => fetchPlan(currentWeekOf),
    [currentWeekOf, fetchPlan]
  );

  // ── week navigation ───────────────────────────────────────────────────────

  const navigateToWeek = useCallback((weekOf: string) => {
    setCurrentWeekOf(weekOf);
  }, []);

  const goToPrevWeek = useCallback(() => {
    setCurrentWeekOf((w) => shiftWeek(w, -1));
  }, []);

  const goToNextWeek = useCallback(() => {
    setCurrentWeekOf((w) => shiftWeek(w, 1));
  }, []);

  // ── addEntry ──────────────────────────────────────────────────────────────

  const addEntry = useCallback(
    async (recipeId: string, day: DayOfWeek, mealType: MealType) => {
      const token = getToken();

      // ── unauthenticated: manage state locally ──
      if (!token) {
        // Duplicate check
        const alreadyExists = mealPlan?.entries.some(
          (e) => e.day === day && e.mealType === mealType
        );
        if (alreadyExists) {
          return { ok: false, message: "A meal is already assigned to this slot" };
        }

        // Look up recipe from mock data
        const sourceRecipe = mockRecipes.find((r) => r.id === recipeId);
        if (!sourceRecipe) {
          return { ok: false, message: "Recipe not found" };
        }

        const newEntry: ApiMealPlanEntry = {
          id: `local-${Date.now()}`,
          recipeId,
          mealPlanId: "local",
          day,
          mealType,
          recipe: toApiRecipe(sourceRecipe),
        };

        setMealPlan((prev) =>
          prev
            ? { ...prev, entries: [...prev.entries, newEntry] }
            : { weekOf: currentWeekOf, entries: [newEntry] }
        );

        return { ok: true };
      }

      // ── authenticated: call API ──
      const res = await fetch(`${API_URL}/api/meal-plans/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weekOf: currentWeekOf, recipeId, day, mealType }),
      });

      if (res.status === 409) {
        return { ok: false, message: "A meal is already assigned to this slot" };
      }
      if (!res.ok) {
        return { ok: false, message: "Failed to add meal" };
      }

      await fetchPlan(currentWeekOf);
      return { ok: true };
    },
    [currentWeekOf, fetchPlan, mealPlan, mockRecipes]
  );

  // ── removeEntry ───────────────────────────────────────────────────────────

  const removeEntry = useCallback(
    async (entryId: string) => {
      const token = getToken();

      // ── unauthenticated: remove from local state ──
      if (!token) {
        setMealPlan((prev) =>
          prev
            ? { ...prev, entries: prev.entries.filter((e) => e.id !== entryId) }
            : prev
        );
        return;
      }

      // ── authenticated: call API ──
      await fetch(`${API_URL}/api/meal-plans/entries/${entryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchPlan(currentWeekOf);
    },
    [currentWeekOf, fetchPlan]
  );

  // ── derived nutrition ─────────────────────────────────────────────────────

  const weeklyTotals = useMemo<NutritionTotals>(() => {
    const entries: ApiMealPlanEntry[] = mealPlan?.entries ?? [];
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
  }, [mealPlan]);

  const dailyBreakdown = useMemo<DailyNutrition[]>(() => {
    const entries: ApiMealPlanEntry[] = mealPlan?.entries ?? [];
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
  }, [mealPlan]);

  const value: MealPlanContextType = {
    mealPlan,
    isLoading,
    currentWeekOf,
    weeklyTotals,
    dailyBreakdown,
    navigateToWeek,
    goToPrevWeek,
    goToNextWeek,
    addEntry,
    removeEntry,
    refreshPlan,
  };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error("useMealPlan must be used within a MealPlanProvider");
  }
  return context;
}
