'use client'

import { useState } from 'react'
import { Edit2, Trash2, GraduationCap, Users, User } from 'lucide-react'
import { ClassSection } from '@/types/database'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useDeleteClassSection } from '@/hooks/use-class-sections'

interface ClassSectionListProps {
  classSections: ClassSection[]
  isLoading: boolean
  searchQuery: string
  filterGrade: string
}

export function ClassSectionList({ classSections, isLoading, searchQuery, filterGrade }: ClassSectionListProps) {
  const [editingClassSection, setEditingClassSection] = useState<ClassSection | null>(null)
  const deleteClassSection = useDeleteClassSection()

  if (isLoading) {
    return <LoadingSpinner />
  }

  // Filter class sections based on search and grade
  const filteredClassSections = classSections.filter(classSection => {
    const matchesSearch = searchQuery === '' || 
      `Grade ${classSection.grade_level}${classSection.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesGrade = filterGrade === 'all' || classSection.grade_level.toString() === filterGrade

    return matchesSearch && matchesGrade
  })

  const handleDelete = async (id: string, name: string, grade: number) => {
    if (window.confirm(`Are you sure you want to delete "Grade ${grade}${name}"?`)) {
      try {
        await deleteClassSection.mutateAsync(id)
      } catch (error) {
        console.error('Failed to delete class section:', error)
      }
    }
  }

  if (filteredClassSections.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {searchQuery || filterGrade !== 'all' ? 'No Classes Found' : 'No Classes Added'}
        </h3>
        <p className="text-gray-600 mb-6">
          {searchQuery || filterGrade !== 'all' 
            ? 'Try adjusting your search or filter criteria.'
            : 'Set up your school\'s grade structure and sections.'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredClassSections.map((classSection) => (
        <div key={classSection.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {classSection.grade_level}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingClassSection(classSection)}
                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(classSection.id, classSection.name, classSection.grade_level)}
                disabled={deleteClassSection.isPending}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                Grade {classSection.grade_level}{classSection.name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{classSection.student_count} students</span>
              </div>
            </div>

            {classSection.class_teacher_id && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Class Teacher Assigned</span>
              </div>
            )}

            <div className="pt-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                classSection.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {classSection.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}