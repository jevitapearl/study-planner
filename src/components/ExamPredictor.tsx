import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Clock,
  AlertCircle,
  CheckCircle,
  Brain,
  BarChart3
} from 'lucide-react';
import { ExamPrediction } from '../types';
import { predictExamQuestions } from '../utils/mockAI';

export function ExamPredictor() {
  const [pastScores, setPastScores] = useState<string>('85, 78, 92, 88, 90');
  const [studyMaterials, setStudyMaterials] = useState<string>('Data Structures\nAlgorithms\nDatabase Design\nWeb Development\nSoftware Engineering');
  const [predictions, setPredictions] = useState<ExamPrediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    const scores = pastScores.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    const materials = studyMaterials.split('\n').filter(m => m.trim());
    
    // Simulate AI analysis time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = predictExamQuestions(scores, materials);
    setPredictions(results);
    setIsAnalyzing(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.8) return 'text-red-600';
    if (probability >= 0.7) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Exam Question Predictor</h2>
        <p className="text-gray-600">Predict likely exam topics based on your performance history and study materials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Past Performance
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Exam Scores (comma-separated)
                </label>
                <input
                  type="text"
                  value={pastScores}
                  onChange={(e) => setPastScores(e.target.value)}
                  placeholder="85, 78, 92, 88, 90"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Average:</strong> {pastScores.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)).reduce((a, b, _, arr) => a + b / arr.length, 0).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Study Materials
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topics Covered (one per line)
                </label>
                <textarea
                  value={studyMaterials}
                  onChange={(e) => setStudyMaterials(e.target.value)}
                  placeholder="Data Structures&#10;Algorithms&#10;Database Design"
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing Patterns...</span>
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                <span>Predict Exam Questions</span>
              </>
            )}
          </button>
        </div>

        {/* Predictions Section */}
        <div className="space-y-6">
          {predictions.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Exam Predictions</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-purple-600 font-medium">AI Analyzed</span>
                </div>
              </div>

              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{prediction.topic}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(prediction.difficulty)}`}>
                          {prediction.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Probability Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Probability</span>
                          <span className={`text-sm font-bold ${getProbabilityColor(prediction.probability)}`}>
                            {(prediction.probability * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              prediction.probability >= 0.8 ? 'bg-red-500' :
                              prediction.probability >= 0.7 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${prediction.probability * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Recommended Study Time */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Recommended study time
                        </span>
                        <span className="font-semibold text-blue-600">
                          {prediction.recommendedStudyTime} hours
                        </span>
                      </div>

                      {/* Priority Indicator */}
                      {prediction.probability > 0.8 && (
                        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">High Priority - Focus Here!</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Study Recommendations</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Focus most effort on topics with 80%+ probability</li>
                  <li>• Review weak areas identified from past performance</li>
                  <li>• Allocate study time based on difficulty and probability</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Predictions Yet</h3>
              <p className="text-gray-600">Enter your past scores and study materials to get AI-powered exam predictions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}