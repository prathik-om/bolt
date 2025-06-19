'use client'

import { createContext, useContext } from 'react'

interface SchoolContextType {
  schoolId: string | null
  setSchoolId: (id: string | null) => void
}

export const SchoolContext = createContext<SchoolContextType>({
  schoolId: null,
  setSchoolId: () => {},
})

export function useSchoolContext() {
  const context = useContext(SchoolContext)
  if (!context) {
    throw new Error('useSchoolContext must be used within a SchoolProvider')
  }
  return context
}