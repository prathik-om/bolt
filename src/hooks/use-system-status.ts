'use client'

import { useQuery } from '@tanstack/react-query'

interface SystemStatus {
  databaseConnected: boolean
  hasGeneratedTimetables: boolean
  lastUpdated: Date
}

export function useSystemStatus() {
  return useQuery({
    queryKey: ['system-status'],
    queryFn: async (): Promise<SystemStatus> => {
      // For demo purposes, return mock data
      return {
        databaseConnected: true,
        hasGeneratedTimetables: false,
        lastUpdated: new Date(),
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  })
}