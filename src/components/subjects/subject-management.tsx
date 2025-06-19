'use client'

import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { SubjectList } from './subject-list'
import { SubjectForm } from './subject-form'
import { useSubjects } from '@/hooks/use-subjects'
import { useSchoolContext } from '@/hooks/use-school-context'

export function SubjectManagement() {
  const { schoolId } = useSchoolContext()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const { data: subjects, isLoading } = useSubjects(schoolId || undefined)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subject Management</h1>
          <p className="text-gray-600 mt-1">Configure subjects and their requirements</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="all">All Types</option>
                <option value="core">Core Subjects</option>
                <option value="elective">Electives</option>
                <option value="practical">Practical</option>
                <option value="language">Languages</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Subject List */}
      <SubjectList 
        subjects={subjects || []}
        isLoading={isLoading}
        searchQuery={searchQuery}
        filterType={filterType}
      />

      {/* Add Subject Modal */}
      {isAddModalOpen && (
        <SubjectForm
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  )
}