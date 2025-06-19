'use client'

import { Monitor, FlaskConical, Users, Building, MapPin } from 'lucide-react'
import { Room } from '@/types/database'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface RoomListProps {
  rooms: Room[]
  isLoading: boolean
  searchQuery: string
  filterType: string
}

export function RoomList({ rooms, isLoading, searchQuery, filterType }: RoomListProps) {
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Filter rooms based on search and type
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = searchQuery === '' || 
      room.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === 'all' || room.room_type === filterType

    return matchesSearch && matchesType
  })

  const getRoomIcon = (roomType: string) => {
    switch (roomType) {
      case 'lab':
        return FlaskConical
      case 'computer_lab':
        return Monitor
      case 'auditorium':
        return Building
      default:
        return MapPin
    }
  }

  if (filteredRooms.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {searchQuery || filterType !== 'all' ? 'No Rooms Found' : 'No Rooms Added'}
        </h3>
        <p className="text-gray-600 mb-6">
          {searchQuery || filterType !== 'all' 
            ? 'Try adjusting your search or filter criteria.'
            : 'Start by adding rooms and facilities to your school.'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRooms.map((room) => {
        const Icon = getRoomIcon(room.room_type)
        
        return (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                <Icon className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                room.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {room.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">{room.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{room.room_type.replace('_', ' ')}</p>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Capacity: {room.capacity}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}