import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { StudyPlanner } from './components/StudyPlanner';
import { ExamPredictor } from './components/ExamPredictor';
import { ProcrastinationBlocker } from './components/ProcrastinationBlocker';
import { ScreenTimeTracker } from './components/ScreenTimeTracker';
import { Community } from './components/Community';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock user data (no TS types here)
  const userPreferences = {
    taskTypes: {
      creative: { preferredTimes: ['10:00', '14:00'], difficulty: 'moderate' },
      analytical: { preferredTimes: ['09:00', '15:00'], difficulty: 'hard' },
      memorization: { preferredTimes: ['08:00', '20:00'], difficulty: 'easy' },
      practical: { preferredTimes: ['11:00', '16:00'], difficulty: 'moderate' }
    },
    learningPace: 'moderate',
    studyDepth: 'detailed',
    screenTimeGoal: 6
  };

  const userStats = {
    totalTasksCompleted: 127,
    studyStreak: 23,
    averageProductivity: 87,
    screenTimeToday: 4.2,
    points: 1250,
    level: 8,
    badges: [
      { id: '1', name: 'Study Streak', description: '7 day streak', icon: '🔥', earnedAt: new Date() },
      { id: '2', name: 'Focus Master', description: '100 focus sessions', icon: '🎯', earnedAt: new Date() }
    ]
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard stats={userStats} />;
      case 'planner':
        return <StudyPlanner preferences={userPreferences} />;
      case 'scheduler':
        return (
          <div className="max-w-6xl mx-auto p-6">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Scheduler</h2>
              <p className="text-gray-600 mb-8">Adaptive task rescheduling based on your preferences and patterns.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                <p className="text-blue-800">
                  This feature will analyze your study patterns and automatically reschedule tasks for optimal learning times.
                </p>
              </div>
            </div>
          </div>
        );
      case 'predictor':
        return <ExamPredictor />;
      case 'blocker':
        return <ProcrastinationBlocker />;
      case 'screentime':
        return <ScreenTimeTracker />;
      case 'community':
        return <Community />;
      case 'settings':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Settings & Preferences</h2>
              <p className="text-gray-600 mb-8">Customize your StudyMind AI experience.</p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
                <p className="text-purple-800">
                  Settings panel for personalizing study preferences, notification settings, privacy controls, and accessibility options.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard stats={userStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main>
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;
