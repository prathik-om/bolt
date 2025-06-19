'use client'

import Link from 'next/link'
import { DivideIcon as LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
  color: 'blue' | 'emerald' | 'purple' | 'orange'
  href?: string
}

export function StatsCard({ title, value, icon: Icon, color, href }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700'
  }

  const content = (
    <div className={cn(
      'p-6 rounded-xl border-2 transition-all duration-200',
      colorClasses[color],
      href && 'cursor-pointer hover:shadow-lg hover:scale-105'
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}