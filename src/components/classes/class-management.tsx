'use client'

import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { ClassSectionList } from './class-section-list'
import { ClassSectionForm } from './class-section-form'
import { useClassSections } from '@/hooks/use-class-sections'
import { useSchoolContext } from '@/hooks/use-school-context'

export function ClassManagement() {
  const { schoolId } = useSchoolContext()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterGrade, setFilterGrade] = useState('all')

  const { data: classSections, isLoading } = useClassSections(schoolId || undefined)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600 mt-1">Configure grades, sections, and subject assignments</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Class</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="all">All Grades</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                  <option key={grade} value={grade.toString()}>Grade {grade}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Class Section List */}
      <ClassSectionList 
        classSections={classSections || []}
        isLoading={isLoading}
        searchQuery={searchQuery}
        filterGrade={filterGrade}
      />

      {/* Add Class Section Modal */}
      {isAddModalOpen && (
        <ClassSectionForm
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  )
}