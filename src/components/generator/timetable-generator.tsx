'use client'

import { useState } from 'react'
import { Zap, Clock, AlertTriangle, CheckCircle, Loader2, Settings, Calendar } from 'lucide-react'
import { useSchoolStats } from '@/hooks/use-school-stats'
import { useCreateTimetableGeneration } from '@/hooks/use-timetable-generations'

export function TimetableGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationSettings, setGenerationSettings] = useState({
    algorithm: 'genetic',
    maxIterations: 1000,
    populationSize: 100,
    mutationRate: 0.1,
    crossoverRate: 0.8,
  })

  const { data: stats } = useSchoolStats()
  const createGeneration = useCreateTimetableGeneration()

  const readinessCheck = () => {
    const issues = []
    if (!stats?.teachers) issues.push('No teachers added')
    if (!stats?.subjects) issues.push('No subjects added')
    if (!stats?.classSections) issues.push('No classes added')
    if (!stats?.timeSlots) issues.push('No time slots configured')
    
    return issues
  }

  const readinessIssues = readinessCheck()
  const isReady = readinessIssues.length === 0

  const handleGenerate = async () => {
    if (!isReady) return

    setIsGenerating(true)
    
    try {
      // Simulate AI generation process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // In a real implementation, this would call the AI generation service
      await createGeneration.mutateAsync({
        term_id: 'demo-term-id', // This would come from selected term
        status: 'completed',
        notes: `Generated using ${generationSettings.algorithm} algorithm`,
      })
      
      alert('Timetable generated successfully!')
    } catch (error) {
      console.error('Failed to generate timetable:', error)
      alert('Failed to generate timetable. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">AI Timetable Generator</h1>
            <p className="opacity-90">Intelligent scheduling with conflict detection</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm opacity-90">
          <Clock className="w-4 h-4" />
          <span>Ready to generate optimized schedules</span>
        </div>
      </div>

      {/* System Readiness */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Readiness</h3>
        
        {isReady ? (
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <div className="font-medium text-green-800">System Ready</div>
              <div className="text-sm text-green-600">All requirements met for timetable generation</div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="font-medium text-yellow-800">Configuration Issues</div>
                <div className="text-sm text-yellow-600">Please resolve the following issues:</div>
              </div>
            </div>
            
            <ul className="space-y-2 ml-6">
              {readinessIssues.map((issue, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Generation Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Generation Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Algorithm
            </label>
            <select
              value={generationSettings.algorithm}
              onChange={(e) => setGenerationSettings({ ...generationSettings, algorithm: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="genetic">Genetic Algorithm</option>
              <option value="simulated_annealing">Simulated Annealing</option>
              <option value="constraint_satisfaction">Constraint Satisfaction</option>
              <option value="hybrid">Hybrid Approach</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Iterations
            </label>
            <input
              type="number"
              min="100"
              max="10000"
              value={generationSettings.maxIterations}
              onChange={(e) => setGenerationSettings({ ...generationSettings, maxIterations: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Current Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Data Overview</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats?.teachers || 0}</div>
            <div className="text-sm text-blue-800">Teachers</div>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{stats?.subjects || 0}</div>
            <div className="text-sm text-emerald-800">Subjects</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats?.classSections || 0}</div>
            <div className="text-sm text-purple-800">Classes</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats?.timeSlots || 0}</div>
            <div className="text-sm text-orange-800">Time Slots</div>
          </div>
        </div>
      </div>

      {/* Generation Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Generate Timetable</h3>
            <p className="text-gray-600">Create optimized schedules using AI algorithms</p>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={!isReady || isGenerating}
            className={`
              px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all
              ${isReady && !isGenerating
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate Timetable</span>
              </>
            )}
          </button>
        </div>

        {isGenerating && (
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-blue-600 font-medium">AI is processing your requirements...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Analyzing constraints, optimizing schedules, and detecting conflicts...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}