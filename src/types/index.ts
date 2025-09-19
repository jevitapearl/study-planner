export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  taskTypes: {
    creative: TimePreference;
    analytical: TimePreference;
    memorization: TimePreference;
    practical: TimePreference;
  };
  learningPace: 'slow' | 'moderate' | 'fast';
  studyDepth: 'overview' | 'detailed' | 'comprehensive';
  screenTimeGoal: number; // hours per day
}

export interface TimePreference {
  preferredTimes: string[];
  difficulty: 'easy' | 'moderate' | 'hard';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'creative' | 'analytical' | 'memorization' | 'practical';
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: number; // minutes
  dueDate: Date;
  completed: boolean;
  scheduledFor?: Date;
}

export interface StudyPlan {
  id: string;
  title: string;
  subject: string;
  totalDuration: number; // days
  tasks: Task[];
  progress: number; // percentage
  createdAt: Date;
}

export interface ExamPrediction {
  topic: string;
  probability: number;
  difficulty: 'easy' | 'medium' | 'hard';
  recommendedStudyTime: number; // hours
}

export interface UserStats {
  totalTasksCompleted: number;
  studyStreak: number;
  averageProductivity: number;
  screenTimeToday: number;
  points: number;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: Date;
  tags: string[];
}