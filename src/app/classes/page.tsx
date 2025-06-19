import { Suspense } from 'react'
import { ClassManagement } from '@/components/classes/class-management'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata = {
  title: 'Class Management - AI Timetable Generator',
  description: 'Configure grades, sections, and subject assignments',
}

export default function ClassesPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<LoadingSpinner />}>
        <ClassManagement />
      </Suspense>
    </DashboardShell>
  )
}