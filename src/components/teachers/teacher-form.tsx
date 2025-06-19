'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useCreateTeacher } from '@/hooks/use-teachers'
import { useSubjects } from '@/hooks/use-subjects'
import { useSchoolContext } from '@/hooks/use-school-context'

interface TeacherFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function TeacherForm({ onClose, onSuccess }: TeacherFormProps) {
  const { schoolId } = useSchoolContext()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    employment_type: 'full_time',
    max_periods_per_week: 30,
    qualifications: [] as string[],
  })

  const createTeacher = useCreateTeacher()
  const { data: subjects } = useSubjects(schoolId || undefined)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await createTeacher.mutateAsync(formData)
      onSuccess()
    } catch (error) {
      console.error('Failed to create teacher:', error)
    }
  }

  const handleQualificationToggle = (subjectId: string) => {
    const updatedQualifications = formData.qualifications.includes(subjectId)
      ? formData.qualifications.filter(s => s !== subjectId)
      : [...formData.qualifications, subjectId]
    
    setFormData({ ...formData, qualifications: updatedQualifications })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Teacher</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="teacher@school.edu"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type
              </label>
              <select
                value={formData.employment_type}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="substitute">Substitute</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Periods Per Week
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={formData.max_periods_per_week}
                onChange={(e) => setFormData({ ...formData, max_periods_per_week: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Subject Qualifications ({formData.qualifications.length} selected)
            </label>
            {subjects && subjects.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                {subjects.map((subject) => (
                  <label key={subject.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.qualifications.includes(subject.id)}
                      onChange={() => handleQualificationToggle(subject.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{subject.code || subject.name}</div>
                      <div className="text-sm text-gray-600">{subject.name}</div>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No subjects available. Please add subjects first.</p>
              </div>
            )}
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
              disabled={createTeacher.isPending}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {createTeacher.isPending ? 'Adding...' : 'Add Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}