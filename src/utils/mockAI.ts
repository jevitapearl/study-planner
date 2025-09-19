import { Task, StudyPlan, ExamPrediction, UserPreferences } from '../types';

export function generateStudyPlan(
  syllabusText: string,
  preferences: UserPreferences
): StudyPlan {
  // Mock AI logic for generating study plan
  const topics = extractTopics(syllabusText);
  const tasks: Task[] = [];
  
  topics.forEach((topic, index) => {
    const baseTask: Task = {
      id: `task-${index}`,
      title: `Study ${topic}`,
      description: `Deep dive into ${topic} concepts and applications`,
      type: getTaskType(topic),
      priority: index < 3 ? 'high' : 'medium',
      estimatedDuration: getDuration(preferences.learningPace),
      dueDate: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000),
      completed: false,
    };
    tasks.push(baseTask);
  });

  return {
    id: `plan-${Date.now()}`,
    title: 'AI Generated Study Plan',
    subject: 'General Studies',
    totalDuration: tasks.length,
    tasks,
    progress: 0,
    createdAt: new Date(),
  };
}

export function predictExamQuestions(
  pastPerformance: number[],
  studyMaterials: string[]
): ExamPrediction[] {
  // Mock AI logic for predicting exam questions
  const predictions: ExamPrediction[] = studyMaterials.map((material, index) => ({
    topic: material,
    probability: Math.random() * 0.4 + 0.6, // 60-100%
    difficulty: ['easy', 'medium', 'hard'][index % 3] as 'easy' | 'medium' | 'hard',
    recommendedStudyTime: Math.floor(Math.random() * 5) + 2, // 2-6 hours
  }));

  return predictions.sort((a, b) => b.probability - a.probability);
}

export function rescheduleTask(
  task: Task,
  preferences: UserPreferences,
  currentSchedule: Task[]
): Date {
  // Mock AI logic for rescheduling
  const taskPref = preferences.taskTypes[task.type];
  const preferredHours = taskPref.preferredTimes.map(time => parseInt(time.split(':')[0]));
  
  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  nextDate.setHours(preferredHours[0] || 9, 0, 0, 0);
  
  return nextDate;
}

function extractTopics(syllabusText: string): string[] {
  // Simple topic extraction
  const topics = [
    'Introduction to Core Concepts',
    'Fundamental Principles',
    'Advanced Applications',
    'Practical Implementation',
    'Case Studies',
    'Review and Assessment'
  ];
  
  return topics.slice(0, Math.min(6, syllabusText.split('\n').length));
}

function getTaskType(topic: string): Task['type'] {
  const keywords = {
    creative: ['design', 'creative', 'art', 'writing'],
    analytical: ['analysis', 'math', 'logic', 'calculation'],
    memorization: ['memorize', 'recall', 'facts', 'dates'],
    practical: ['implementation', 'practice', 'hands-on', 'lab']
  };
  
  for (const [type, words] of Object.entries(keywords)) {
    if (words.some(word => topic.toLowerCase().includes(word))) {
      return type as Task['type'];
    }
  }
  
  return 'analytical';
}

function getDuration(pace: string): number {
  const baseDuration = 60; // minutes
  switch (pace) {
    case 'slow': return baseDuration * 1.5;
    case 'fast': return baseDuration * 0.7;
    default: return baseDuration;
  }
}