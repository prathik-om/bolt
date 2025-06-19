'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { SchoolContext } from '@/hooks/use-school-context'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 10 * 60 * 1000, // 10 minutes
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors
              if (error && typeof error === 'object' && 'status' in error) {
                const status = error.status as number
                if (status >= 400 && status < 500) return false
              }
              return failureCount < 3
            },
          },
        },
      })
  )

  // For demo purposes, using a hardcoded school ID
  // In a real app, this would come from authentication
  const [schoolId, setSchoolId] = useState<string | null>('demo-school-id')

  return (
    <QueryClientProvider client={queryClient}>
      <SchoolContext.Provider value={{ schoolId, setSchoolId }}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </SchoolContext.Provider>
    </QueryClientProvider>
  )
}