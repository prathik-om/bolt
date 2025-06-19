import { Suspense } from 'react'
import { RoomManagement } from '@/components/rooms/room-management'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata = {
  title: 'Room Management - AI Timetable Generator',
  description: 'Manage classrooms and facilities',
}

export default function RoomsPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<LoadingSpinner />}>
        <RoomManagement />
      </Suspense>
    </DashboardShell>
  )
}