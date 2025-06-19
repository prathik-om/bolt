'use client'

import { useState } from 'react'
import { Edit2, Trash2, Mail, BookOpen, Clock, AlertCircle } from 'lucide-react'
import { TeacherWithQualifications } from '@/types/database'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface TeacherListProps {
  teachers: TeacherWithQualifications[]
  isLoading: boolean
  searchQuery: string
  filterDepartment: string
}

export function TeacherList({ teachers, isLoading, searchQuery, filterDepartment }: TeacherListProps) {
  const [editingTeacher, setEditingTeacher] = useState<TeacherWithQualifications | null>(null)

  if (isLoading) {
    return <LoadingSpinner />
  }

  // Filter teachers based on search and department
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = searchQuery === '' || 
      `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = filterDepartment === 'all' || teacher.department === filterDepartment

    return matchesSearch && matchesDepartment
  })

  if (filteredTeachers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {searchQuery || filterDepartment !== 'all' ? 'No Teachers Found' : 'No Teachers Added'}
        </h3>
        <p className="text-gray-600 mb-6">
          {searchQuery || filterDepartment !== 'all' 
            ? 'Try adjusting your search or filter criteria.'
            : 'Get started by adding your first teacher to the system.'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTeachers.map((teacher) => (
        <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {teacher.first_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingTeacher(teacher)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {/* Handle delete */}}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                {teacher.first_name} {teacher.last_name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{teacher.email}</span>
              </div>
            </div>

            {teacher.department && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Department:</span> {teacher.department}
              </div>
            )}

            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Subjects ({teacher.qualifications?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {teacher.qualifications?.slice(0, 3).map(qual => (
                  <span key={qual.id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {qual.subject?.code || 'Unknown'}
                  </span>
                ))}
                {(teacher.qualifications?.length || 0) > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{(teacher.qualifications?.length || 0) - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Max {teacher.max_periods_per_day}h/day</span>
              </div>
              {!teacher.is_active && (
                <div className="flex items-center space-x-1 text-orange-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs">Inactive</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}