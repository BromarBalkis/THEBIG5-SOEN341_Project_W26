export function recipeEmoji(title = ''): string {
  const t = String(title).toLowerCase()
  if (t.includes('chicken')) return '🍗'
  if (t.includes('pasta')) return '🍝'
  if (t.includes('salad')) return '🥗'
  return '🍽️'
}

export function findEntry(entries: any[] = [], day: string, mealType: string) {
  if (!entries || entries.length === 0) return undefined
  return entries.find((e) => e.day === day && e.mealType === mealType)
}

export default { recipeEmoji, findEntry }
