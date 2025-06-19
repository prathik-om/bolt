'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useCreateSubject } from '@/hooks/use-subjects'
import { useSchoolContext } from '@/hooks/use-school-context'

interface SubjectFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function SubjectForm({ onClose, onSuccess }: SubjectFormProps) {
  const { schoolId } = useSchoolContext()
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    subject_type: 'core',
    required_room_type: '',
  })

  const createSubject = useCreateSubject()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!schoolId) {
      alert('No school selected')
      return
    }

    try {
      await createSubject.mutateAsync({
        ...formData,
        school_id: schoolId,
        required_room_type: formData.required_room_type || null,
        is_active: true,
      })
      onSuccess()
    } catch (error) {
      console.error('Failed to create subject:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Subject</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., Mathematics"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., MATH"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Type
            </label>
            <select
              value={formData.subject_type}
              onChange={(e) => setFormData({ ...formData, subject_type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="core">Core Subject</option>
              <option value="elective">Elective</option>
              <option value="practical">Practical</option>
              <option value="language">Language</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Room Type
            </label>
            <select
              value={formData.required_room_type}
              onChange={(e) => setFormData({ ...formData, required_room_type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Regular Classroom</option>
              <option value="lab">Laboratory</option>
              <option value="computer_lab">Computer Lab</option>
              <option value="auditorium">Auditorium</option>
              <option value="gym">Gymnasium</option>
              <option value="library">Library</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createSubject.isPending}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {createSubject.isPending ? 'Adding...' : 'Add Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}