'use client'

import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { RoomList } from './room-list'
import { useRooms } from '@/hooks/use-rooms'
import { useSchoolContext } from '@/hooks/use-school-context'

export function RoomManagement() {
  const { schoolId } = useSchoolContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const { data: rooms, isLoading } = useRooms(schoolId || undefined)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600 mt-1">Manage classrooms and facilities</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Room</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Room Types</option>
                <option value="regular">Regular Classroom</option>
                <option value="lab">Laboratory</option>
                <option value="computer_lab">Computer Lab</option>
                <option value="auditorium">Auditorium</option>
                <option value="gym">Gymnasium</option>
                <option value="library">Library</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Room List */}
      <RoomList 
        rooms={rooms || []}
        isLoading={isLoading}
        searchQuery={searchQuery}
        filterType={filterType}
      />
    </div>
  )
}