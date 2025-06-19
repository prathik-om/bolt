'use client'

import { Navigation } from '@/components/navigation/navigation'

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <Navigation>
      {children}
    </Navigation>
  )
}