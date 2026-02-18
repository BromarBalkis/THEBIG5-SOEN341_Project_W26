import React from 'react'
import { Card } from '@/components/ui'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatTime } from '@/lib/utils'

interface Props {
  recipe: any
}

export default function RecentRecipeCard({ recipe }: Props) {
  return (
    <Card padding="md" className="hover:shadow-lg">
      <div className="text-4xl mb-2">{recipe?.emoji || '🍽️'}</div>
      <div className="font-semibold text-gray-900 mb-1 line-clamp-1">{recipe.title}</div>
      <div className="text-sm text-gray-500 flex items-center gap-2">
        {formatTime((recipe.prepTime || 0) + (recipe.cookTime || 0))}
        <span>•</span>
        <span>{recipe.difficulty}</span>
      </div>
      <div className="text-sm text-gray-500 line-clamp-2 mt-2">{recipe.description}</div>
      <Link href={`/recipes/${recipe.id}`} className="text-sm text-primary hover:underline mt-3 inline-flex items-center gap-1">
        View Recipe
        <ArrowRight size={12} />
      </Link>
    </Card>
  )
}
