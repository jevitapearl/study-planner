import React, { useState } from 'react';
import { 
  Upload, 
  BookOpen, 
  Clock, 
  CheckCircle2,
  Calendar,
  Target,
  Brain
} from 'lucide-react';
import { StudyPlan, UserPreferences } from '../types';
import { generateStudyPlan } from '../utils/mockAI';

interface StudyPlannerProps {
  preferences: UserPreferences;
}

export function StudyPlanner({ preferences }: StudyPlannerProps) {
  const [syllabusText, setSyllabusText] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePlan = async () => {
    if (!syllabusText.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const plan = generateStudyPlan(syllabusText, preferences);
    setGeneratedPlan(plan);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Study Planner</h2>
        <p className="text-gray-600">Transform your syllabus into a personalized study plan instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              Upload Syllabus
            </h3>
            <div className="space-y-4">
              <textarea
                value={syllabusText}
                onChange={(e) => setSyllabusText(e.target.value)}
                placeholder="Paste your syllabus content here, or upload a file..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Upload File
                </button>
                <span className="text-sm text-gray-500">
                  {syllabusText.length} characters
                </span>
              </div>
            </div>
          </div>

          {/* Preferences Display */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Learning Preferences</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Learning Pace</p>
                <p className="text-blue-600 capitalize">{preferences.learningPace}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Study Depth</p>
                <p className="text-green-600 capitalize">{preferences.studyDepth}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={!syllabusText.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Plan...</span>
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                <span>Generate AI Study Plan</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Plan */}
        <div className="space-y-6">
          {generatedPlan ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Generated Study Plan</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">AI Generated</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Total Duration</p>
                    <p className="text-blue-600 font-semibold">{generatedPlan.totalDuration} days</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Total Tasks</p>
                    <p className="text-purple-600 font-semibold">{generatedPlan.tasks.length} tasks</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{generatedPlan.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${generatedPlan.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Study Tasks</h4>
                {generatedPlan.tasks.slice(0, 5).map((task, index) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {task.estimatedDuration} min
                        </span>
                        <span className="flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          {task.priority}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {task.dueDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.type === 'analytical' ? 'bg-blue-100 text-blue-800' :
                      task.type === 'creative' ? 'bg-purple-100 text-purple-800' :
                      task.type === 'practical' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {task.type}
                    </span>
                  </div>
                ))}
                {generatedPlan.tasks.length > 5 && (
                  <div className="text-center py-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View all {generatedPlan.tasks.length} tasks →
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Plan
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Customize
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Study Plan Yet</h3>
              <p className="text-gray-600">Upload your syllabus to generate a personalized AI study plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}