import type { DayOfWeek, MealPlanEntry, GroceryItem } from '@/types';

export function formatTime(minutes: number): string {
  if (minutes === 0) {
    return '0 min';
  }

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}

export function formatCost(cost: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cost);
}

export function getCostRange(cost: number): '$' | '$$' | '$$$' {
  if (cost < 5) {
    return '$';
  }
  if (cost <= 15) {
    return '$$';
  }
  return '$$$';
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600';
    case 'Medium':
      return 'text-yellow-600';
    case 'Hard':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

export function getDifficultyBgColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-700';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'Hard':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getCurrentWeekOf(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  return monday.toISOString().split('T')[0];
}

export function generateWeekDates(
  weekOf: string
): Array<{ day: DayOfWeek; date: string; shortDate: string }> {
  const days: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const startDate = new Date(weekOf);
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const dateString = date.toISOString().split('T')[0];
    const shortDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    weekDates.push({
      day: days[i],
      date: dateString,
      shortDate,
    });
  }

  return weekDates;
}

export function getWeekRangeLabel(weekOf: string): string {
  const startDate = new Date(weekOf);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const startLabel = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const endLabel = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${startLabel} - ${endLabel}`;
}

export function navigateWeek(
  weekOf: string,
  direction: 'prev' | 'next'
): string {
  const date = new Date(weekOf);
  const daysToAdd = direction === 'next' ? 7 : -7;
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
}

export function consolidateIngredients(
  entries: MealPlanEntry[]
): GroceryItem[] {
  const ingredientMap = new Map<
    string,
    {
      quantity: number;
      unit: string;
      recipes: string[];
    }
  >();

  // Helper function to categorize ingredients
  function categorizeIngredient(
    name: string
  ): 'Produce' | 'Meat & Protein' | 'Dairy' | 'Grains & Pasta' | 'Canned & Packaged' | 'Spices & Condiments' | 'Other' {
    const lowerName = name.toLowerCase();

    if (
      lowerName.includes('chicken') ||
      lowerName.includes('beef') ||
      lowerName.includes('fish') ||
      lowerName.includes('salmon') ||
      lowerName.includes('turkey') ||
      lowerName.includes('ham') ||
      lowerName.includes('meat') ||
      lowerName.includes('egg') ||
      lowerName.includes('tofu') ||
      lowerName.includes('beans') ||
      lowerName.includes('pork')
    ) {
      return 'Meat & Protein';
    }

    if (
      lowerName.includes('milk') ||
      lowerName.includes('cheese') ||
      lowerName.includes('yogurt') ||
      lowerName.includes('butter') ||
      lowerName.includes('cream')
    ) {
      return 'Dairy';
    }

    if (
      lowerName.includes('rice') ||
      lowerName.includes('pasta') ||
      lowerName.includes('bread') ||
      lowerName.includes('flour') ||
      lowerName.includes('grain') ||
      lowerName.includes('wheat') ||
      lowerName.includes('oat')
    ) {
      return 'Grains & Pasta';
    }

    if (
      lowerName.includes('salt') ||
      lowerName.includes('pepper') ||
      lowerName.includes('spice') ||
      lowerName.includes('garlic') ||
      lowerName.includes('onion') ||
      lowerName.includes('sauce') ||
      lowerName.includes('oil') ||
      lowerName.includes('vinegar') ||
      lowerName.includes('herb')
    ) {
      return 'Spices & Condiments';
    }

    if (
      lowerName.includes('apple') ||
      lowerName.includes('banana') ||
      lowerName.includes('carrot') ||
      lowerName.includes('broccoli') ||
      lowerName.includes('lettuce') ||
      lowerName.includes('tomato') ||
      lowerName.includes('potato') ||
      lowerName.includes('vegetable') ||
      lowerName.includes('fruit')
    ) {
      return 'Produce';
    }

    if (
      lowerName.includes('can') ||
      lowerName.includes('box') ||
      lowerName.includes('package')
    ) {
      return 'Canned & Packaged';
    }

    return 'Other';
  }

  // Process all entries
  entries.forEach((entry) => {
    entry.recipe.ingredients.forEach((ingredient) => {
      const key = ingredient.name.toLowerCase();

      if (ingredientMap.has(key)) {
        const existing = ingredientMap.get(key)!;
        existing.quantity += ingredient.quantity;
        if (!existing.recipes.includes(entry.recipe.title)) {
          existing.recipes.push(entry.recipe.title);
        }
      } else {
        ingredientMap.set(key, {
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          recipes: [entry.recipe.title],
        });
      }
    });
  });

  // Convert to GroceryItem array
  const groceryItems: GroceryItem[] = Array.from(ingredientMap.entries()).map(
    ([name, data], index) => ({
      id: `grocery-${index}-${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      quantity: data.quantity,
      unit: data.unit,
      category: categorizeIngredient(name),
      estimatedCost: data.quantity * 0.5,
      isPurchased: false,
      isInPantry: false,
      fromRecipes: data.recipes,
    })
  );

  return groceryItems;
}

export function getInitials(fullName: string): string {
  const names = fullName.trim().split(/\s+/);

  if (names.length === 0) {
    return '';
  }

  if (names.length === 1) {
    return names[0][0].toUpperCase();
  }

  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}
