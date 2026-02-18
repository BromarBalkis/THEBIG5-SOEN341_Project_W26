import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui'

interface Props {
  href: string
  emoji: string
  title: string
  subtitle?: string
}

export default function QuickActionCard({ href, emoji, title, subtitle }: Props) {
  return (
    <Link href={href} className="block">
      <Card padding="md" className="hover:shadow-lg">
        <div className="text-3xl mb-2">{emoji}</div>
        <div className="font-semibold text-gray-900">{title}</div>
        {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        <div className="text-primary mt-2">→</div>
      </Card>
    </Link>
  )
}
