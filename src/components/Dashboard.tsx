import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Target,
  Award,
  Users,
  Brain,
  Zap
} from 'lucide-react';
import { UserStats } from '../types';

interface DashboardProps {
  stats: UserStats;
}

export function Dashboard({ stats }: DashboardProps) {
  const recentActivity = [
    { action: 'Completed "Advanced Algorithms" study session', time: '2 hours ago', type: 'success' },
    { action: 'Earned "Study Streak" badge', time: '4 hours ago', type: 'achievement' },
    { action: 'Rescheduled 3 tasks for optimal timing', time: '6 hours ago', type: 'info' },
    { action: 'Blocked 15 distracting websites', time: '8 hours ago', type: 'focus' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h2>
        <p className="text-gray-600">Here's your learning progress and insights.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Study Streak</p>
              <p className="text-3xl font-bold text-blue-900">{stats.studyStreak}</p>
              <p className="text-blue-600 text-xs">days</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Tasks Completed</p>
              <p className="text-3xl font-bold text-green-900">{stats.totalTasksCompleted}</p>
              <p className="text-green-600 text-xs">this week</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Productivity</p>
              <p className="text-3xl font-bold text-purple-900">{stats.averageProductivity}%</p>
              <p className="text-purple-600 text-xs">average</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Study Points</p>
              <p className="text-3xl font-bold text-orange-900">{stats.points}</p>
              <p className="text-orange-600 text-xs">Level {stats.level}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'achievement' ? 'bg-purple-500' :
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
              <Brain className="w-8 h-8 text-gray-600 group-hover:text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900">Generate Study Plan</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
              <Clock className="w-8 h-8 text-gray-600 group-hover:text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 group-hover:text-green-900">Schedule Tasks</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
              <Target className="w-8 h-8 text-gray-600 group-hover:text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 group-hover:text-purple-900">Predict Exam</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
              <Zap className="w-8 h-8 text-gray-600 group-hover:text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 group-hover:text-orange-900">Focus Mode</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}