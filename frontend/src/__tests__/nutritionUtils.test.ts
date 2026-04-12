import { describe, test, expect } from "vitest";
import {
  computeWeeklyTotals,
  computeDailyBreakdown,
  toApiRecipe,
  DAYS_OF_WEEK,
} from "../lib/nutritionUtils";

// ── helpers ───────────────────────────────────────────────────────────────────

/** Build a minimal ApiMealPlanEntry for use in tests. */
function makeEntry(
  day: string,
  calories: number | null,
  protein: number | null = null,
  carbs: number | null = null,
  fat: number | null = null
) {
  return {
    id: `e-${Math.random()}`,
    recipeId: "r1",
    mealPlanId: "mp1",
    day: day as import("../types/meal-plan.types").DayOfWeek,
    mealType: "Lunch" as const,
    recipe: {
      id: "r1",
      title: "Test Recipe",
      prepTime: 30,
      difficulty: "Easy",
      dietaryTags: [],
      nutritionCalories: calories,
      nutritionProtein: protein,
      nutritionCarbs: carbs,
      nutritionFat: fat,
    },
  };
}

/** Build a minimal Recipe (frontend shape) for toApiRecipe tests. */
function makeRecipe(nutrition?: { calories: number; protein: number; carbs: number; fat: number }) {
  return {
    id: "r1",
    userId: "u1",
    title: "Pasta",
    description: "desc",
    prepTime: 20,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy" as const,
    costPerServing: 5,
    dietaryTags: [],
    ingredients: [],
    steps: [],
    nutrition,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// ── computeWeeklyTotals ───────────────────────────────────────────────────────

describe("computeWeeklyTotals", () => {
  test("returns all zeros for an empty entry list", () => {
    const result = computeWeeklyTotals([]);
    expect(result).toEqual({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  });

  test("sums nutrition across multiple entries", () => {
    const entries = [
      makeEntry("Monday", 400, 30, 50, 10),
      makeEntry("Tuesday", 600, 40, 70, 20),
    ];
    const result = computeWeeklyTotals(entries);
    expect(result).toEqual({ calories: 1000, protein: 70, carbs: 120, fat: 30 });
  });

  test("treats null nutrition fields as 0", () => {
    const entries = [
      makeEntry("Monday", null, null, null, null),
      makeEntry("Tuesday", 500, null, null, null),
    ];
    const result = computeWeeklyTotals(entries);
    expect(result).toEqual({ calories: 500, protein: 0, carbs: 0, fat: 0 });
  });

  test("handles a mix of null and numeric nutrition on the same entry", () => {
    const entries = [makeEntry("Wednesday", 300, null, 40, null)];
    const result = computeWeeklyTotals(entries);
    expect(result).toEqual({ calories: 300, protein: 0, carbs: 40, fat: 0 });
  });

  test("handles entries whose recipe field is null", () => {
    const entry = {
      id: "e1",
      recipeId: "r1",
      mealPlanId: "mp1",
      day: "Monday" as const,
      mealType: "Lunch" as const,
      recipe: null,
    };
    const result = computeWeeklyTotals([entry]);
    expect(result).toEqual({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  });

  test("sums a single entry correctly", () => {
    const entries = [makeEntry("Friday", 250, 15, 30, 8)];
    const result = computeWeeklyTotals(entries);
    expect(result).toEqual({ calories: 250, protein: 15, carbs: 30, fat: 8 });
  });
});

// ── computeDailyBreakdown ─────────────────────────────────────────────────────

describe("computeDailyBreakdown", () => {
  test("returns all 7 days with zeros for an empty entry list", () => {
    const result = computeDailyBreakdown([]);
    expect(result).toHaveLength(7);
    result.forEach((day) => {
      expect(day.calories).toBe(0);
      expect(day.protein).toBe(0);
      expect(day.carbs).toBe(0);
      expect(day.fat).toBe(0);
    });
  });

  test("days are always returned in Monday→Sunday order", () => {
    const result = computeDailyBreakdown([]);
    const dayNames = result.map((d) => d.day);
    expect(dayNames).toEqual(DAYS_OF_WEEK);
  });

  test("assigns nutrition to the correct day", () => {
    const entries = [makeEntry("Wednesday", 500, 25, 60, 15)];
    const result = computeDailyBreakdown(entries);

    const wed = result.find((d) => d.day === "Wednesday")!;
    expect(wed.calories).toBe(500);
    expect(wed.protein).toBe(25);

    // All other days stay at zero
    const otherDays = result.filter((d) => d.day !== "Wednesday");
    otherDays.forEach((d) => expect(d.calories).toBe(0));
  });

  test("sums multiple entries on the same day", () => {
    const entries = [
      makeEntry("Monday", 300, 20, 40, 10),
      makeEntry("Monday", 200, 10, 30, 5),
    ];
    const result = computeDailyBreakdown(entries);

    const mon = result.find((d) => d.day === "Monday")!;
    expect(mon.calories).toBe(500);
    expect(mon.protein).toBe(30);
    expect(mon.carbs).toBe(70);
    expect(mon.fat).toBe(15);
  });

  test("treats null nutrition on a daily entry as 0", () => {
    const entries = [makeEntry("Thursday", null, null, null, null)];
    const result = computeDailyBreakdown(entries);

    const thu = result.find((d) => d.day === "Thursday")!;
    expect(thu.calories).toBe(0);
    expect(thu.protein).toBe(0);
  });

  test("handles entries spread across multiple distinct days", () => {
    const entries = [
      makeEntry("Monday", 400, 30, 50, 10),
      makeEntry("Friday", 700, 50, 80, 25),
    ];
    const result = computeDailyBreakdown(entries);

    const mon = result.find((d) => d.day === "Monday")!;
    const fri = result.find((d) => d.day === "Friday")!;
    const tue = result.find((d) => d.day === "Tuesday")!;

    expect(mon.calories).toBe(400);
    expect(fri.calories).toBe(700);
    expect(tue.calories).toBe(0);
  });
});

// ── toApiRecipe ───────────────────────────────────────────────────────────────

describe("toApiRecipe", () => {
  test("maps flat scalar fields correctly", () => {
    const recipe = makeRecipe({ calories: 400, protein: 30, carbs: 50, fat: 10 });
    const result = toApiRecipe(recipe);

    expect(result.id).toBe("r1");
    expect(result.title).toBe("Pasta");
    expect(result.prepTime).toBe(20);
    expect(result.difficulty).toBe("Easy");
  });

  test("maps nested nutrition to flat fields", () => {
    const recipe = makeRecipe({ calories: 400, protein: 30, carbs: 50, fat: 10 });
    const result = toApiRecipe(recipe);

    expect(result.nutritionCalories).toBe(400);
    expect(result.nutritionProtein).toBe(30);
    expect(result.nutritionCarbs).toBe(50);
    expect(result.nutritionFat).toBe(10);
  });

  test("returns null for all nutrition fields when nutrition is absent", () => {
    const recipe = makeRecipe(undefined);
    const result = toApiRecipe(recipe);

    expect(result.nutritionCalories).toBeNull();
    expect(result.nutritionProtein).toBeNull();
    expect(result.nutritionCarbs).toBeNull();
    expect(result.nutritionFat).toBeNull();
  });

  test("preserves dietaryTags as a string array", () => {
    const recipe = {
      ...makeRecipe(),
      dietaryTags: ["vegan", "gluten-free"] as import("../types/user.types").DietaryPreference[],
    };
    const result = toApiRecipe(recipe);
    expect(result.dietaryTags).toEqual(["vegan", "gluten-free"]);
  });
});
