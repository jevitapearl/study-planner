import React, { useState } from 'react';
import { 
  Clock, 
  Smartphone, 
  Monitor,
  TrendingDown,
  Target,
  Bell,
  Eye,
  Calendar
} from 'lucide-react';

interface AppUsage {
  name: string;
  icon: string;
  timeSpent: number; // minutes
  category: string;
  trend: 'up' | 'down' | 'stable';
}

export function ScreenTimeTracker() {
  const [dailyGoal, setDailyGoal] = useState(6); // hours
  const [currentUsage] = useState(4.2); // hours today
  
  const appUsage: AppUsage[] = [
    { name: 'YouTube', icon: '📺', timeSpent: 95, category: 'Entertainment', trend: 'up' },
    { name: 'Instagram', icon: '📸', timeSpent: 67, category: 'Social', trend: 'down' },
    { name: 'Chrome', icon: '🌐', timeSpent: 54, category: 'Productivity', trend: 'stable' },
    { name: 'WhatsApp', icon: '💬', timeSpent: 43, category: 'Communication', trend: 'down' },
    { name: 'VS Code', icon: '💻', timeSpent: 38, category: 'Productivity', trend: 'up' },
    { name: 'Twitter', icon: '🐦', timeSpent: 29, category: 'Social', trend: 'down' },
  ];

  const weeklyData = [
    { day: 'Mon', hours: 5.2 },
    { day: 'Tue', hours: 6.8 },
    { day: 'Wed', hours: 4.9 },
    { day: 'Thu', hours: 7.1 },
    { day: 'Fri', hours: 3.8 },
    { day: 'Sat', hours: 8.2 },
    { day: 'Sun', hours: 4.2 }, // today
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Entertainment': return 'bg-red-100 text-red-800';
      case 'Social': return 'bg-blue-100 text-blue-800';
      case 'Productivity': return 'bg-green-100 text-green-800';
      case 'Communication': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const progressPercentage = (currentUsage / dailyGoal) * 100;
  const isOverGoal = currentUsage > dailyGoal;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Screen Time Management</h2>
        <p className="text-gray-600">Monitor and reduce your screen time with AI-powered insights and recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Today's Usage
              </h3>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{currentUsage}h</p>
                <p className="text-sm text-gray-600">of {dailyGoal}h goal</p>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={isOverGoal ? "#ef4444" : "#3b82f6"}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${Math.min(progressPercentage, 100) * 2.51} 251`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isOverGoal ? 'text-red-600' : 'text-blue-600'}`}>
                      {Math.round(progressPercentage)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${
              isOverGoal 
                ? 'bg-red-50 border-red-200 text-red-800' 
                : 'bg-green-50 border-green-200 text-green-800'
            }`}>
              <div className="flex items-center space-x-2">
                <Target className={`w-5 h-5 ${isOverGoal ? 'text-red-600' : 'text-green-600'}`} />
                <span className="font-semibold">
                  {isOverGoal ? 'Goal Exceeded' : 'On Track'}
                </span>
              </div>
              <p className="text-sm mt-1">
                {isOverGoal 
                  ? `You've exceeded your daily goal by ${(currentUsage - dailyGoal).toFixed(1)} hours.` 
                  : `${(dailyGoal - currentUsage).toFixed(1)} hours remaining to reach your goal.`}
              </p>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Weekly Trend
            </h3>
            <div className="flex items-end justify-between h-32 mb-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center space-y-2">
                  <div 
                    className={`w-8 rounded-t transition-all duration-500 ${
                      index === weeklyData.length - 1 ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{ height: `${(day.hours / 10) * 100}px` }}
                  ></div>
                  <span className="text-xs font-medium text-gray-600">{day.day}</span>
                  <span className="text-xs text-gray-500">{day.hours}h</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Average: 5.7h/day</span>
              </div>
              <div className="text-green-600 font-medium">↓ 12% from last week</div>
            </div>
          </div>

          {/* App Usage */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-green-600" />
              App Usage Breakdown
            </h3>
            <div className="space-y-3">
              {appUsage.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{app.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(app.category)}`}>
                          {app.category}
                        </span>
                        <span className="text-xs">{getTrendIcon(app.trend)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatTime(app.timeSpent)}</p>
                    <p className="text-xs text-gray-500">{Math.round((app.timeSpent / (currentUsage * 60)) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings & Recommendations */}
        <div className="space-y-6">
          {/* Daily Goal Setting */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-600" />
              Daily Goal
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Screen Time Goal (hours)
                </label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2h</span>
                  <span className="font-medium">{dailyGoal}h</span>
                  <span>12h</span>
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                Update Goal
              </button>
            </div>
          </div>

          {/* Break Reminders */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-600" />
              Break Reminders
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">20-20-20 Rule</span>
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Hourly Breaks</span>
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Bedtime Reminder</span>
                <input type="checkbox" className="rounded border-gray-300" />
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-purple-600" />
              AI Insights
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <p className="font-medium text-purple-900">Peak Usage Time</p>
                <p className="text-gray-600">You use devices most between 2-4 PM. Consider scheduling breaks.</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-medium text-blue-900">Productivity Tip</p>
                <p className="text-gray-600">Your productivity increases by 23% on days with &lt;5h screen time.</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-medium text-green-900">Sleep Quality</p>
                <p className="text-gray-600">Reducing evening screen time by 1h could improve sleep by 18%.</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Start Focus Mode
              </button>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm">
                Take a Break
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}