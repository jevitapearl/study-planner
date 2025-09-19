import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  Target, 
  Shield, 
  Clock, 
  Users, 
  BarChart3,
  Settings
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'planner', label: 'Study Planner', icon: BookOpen },
  { id: 'scheduler', label: 'Smart Scheduler', icon: Calendar },
  { id: 'predictor', label: 'Exam Predictor', icon: Target },
  { id: 'blocker', label: 'Focus Blocker', icon: Shield },
  { id: 'screentime', label: 'Screen Time', icon: Clock },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StudyMind AI
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => onSectionChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}