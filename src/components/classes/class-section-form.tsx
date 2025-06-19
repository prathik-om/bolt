'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useCreateClassSection } from '@/hooks/use-class-sections'
import { useTeachers } from '@/hooks/use-teachers'
import { useSchoolContext } from '@/hooks/use-school-context'

interface ClassSectionFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function ClassSectionForm({ onClose, onSuccess }: ClassSectionFormProps) {
  const { schoolId } = useSchoolContext()
  const [formData, setFormData] = useState({
    grade_level: 1,
    name: 'A',
    student_count: 30,
    class_teacher_id: '',
  })

  const createClassSection = useCreateClassSection()
  const { data: teachers } = useTeachers()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!schoolId) {
      alert('No school selected')
      return
    }

    try {
      await createClassSection.mutateAsync({
        ...formData,
        school_id: schoolId,
        class_teacher_id: formData.class_teacher_id || null,
        is_active: true,
      })
      onSuccess()
    } catch (error) {
      console.error('Failed to create class section:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Class</h2>
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
              Grade Level *
            </label>
            <select
              value={formData.grade_level}
              onChange={(e) => setFormData({ ...formData, grade_level: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="A"
              maxLength={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Count
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={formData.student_count}
              onChange={(e) => setFormData({ ...formData, student_count: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Teacher (Optional)
            </label>
            <select
              value={formData.class_teacher_id}
              onChange={(e) => setFormData({ ...formData, class_teacher_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Class Teacher</option>
              {teachers?.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.first_name} {teacher.last_name}
                </option>
              ))}
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
              disabled={createClassSection.isPending}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {createClassSection.isPending ? 'Adding...' : 'Add Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}