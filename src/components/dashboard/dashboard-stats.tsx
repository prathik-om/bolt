'use client'

import { useSchoolStats } from '@/hooks/use-school-stats'
import { Users, BookOpen, GraduationCap, Calendar } from 'lucide-react'
import { StatsCard } from '@/components/ui/stats-card'

export function DashboardStats() {
  const { data: stats, isLoading } = useSchoolStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const statsData = [
    {
      title: 'Teachers',
      value: stats?.teachers || 0,
      icon: Users,
      color: 'blue',
      href: '/teachers'
    },
    {
      title: 'Subjects',
      value: stats?.subjects || 0,
      icon: BookOpen,
      color: 'emerald',
      href: '/subjects'
    },
    {
      title: 'Classes',
      value: stats?.classSections || 0,
      icon: GraduationCap,
      color: 'purple',
      href: '/classes'
    },
    {
      title: 'Timetables',
      value: stats?.timetables || 0,
      icon: Calendar,
      color: 'orange',
      href: '/timetables'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}