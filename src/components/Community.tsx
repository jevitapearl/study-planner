import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share,
  TrendingUp,
  Clock,
  Award,
  UserPlus,
  Search,
  Filter
} from 'lucide-react';
import { CommunityPost } from '../types';

export function Community() {
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'leaderboard'>('feed');
  const [newPost, setNewPost] = useState('');

  const posts: CommunityPost[] = [
    {
      id: '1',
      author: 'Sarah Chen',
      content: 'Just completed my first 25-day study streak! The AI scheduler really helped me stay consistent. Anyone else finding the adaptive rescheduling feature useful?',
      likes: 23,
      comments: 7,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      tags: ['study-streak', 'motivation']
    },
    {
      id: '2',
      author: 'Alex Kumar',
      content: 'Pro tip: I use the Pomodoro technique with the Focus Shield and it\'s been a game changer. Blocked 150+ distracting sites today and earned 200 points! 🎯',
      likes: 45,
      comments: 12,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      tags: ['focus', 'productivity', 'tips']
    },
    {
      id: '3',
      author: 'Maria Rodriguez',
      content: 'The exam predictor was spot on! It predicted 85% of the topics that appeared on my midterm. Thanks to the AI recommendations, I focused my study time perfectly.',
      likes: 67,
      comments: 19,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      tags: ['exam', 'success-story', 'AI']
    },
    {
      id: '4',
      author: 'David Park',
      content: 'Study group forming for Computer Science fundamentals! We\'re using the community features to hold each other accountable. DM me if interested!',
      likes: 12,
      comments: 8,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      tags: ['study-group', 'computer-science', 'accountability']
    }
  ];

  const studyGroups = [
    { name: 'CS Fundamentals', members: 234, active: true },
    { name: 'Medical School Prep', members: 189, active: true },
    { name: 'Language Learners', members: 156, active: false },
    { name: 'Math Olympiad', members: 98, active: true },
    { name: 'Business Studies', members: 76, active: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'Elena Vasquez', points: 12450, streak: 47, badge: '🏆' },
    { rank: 2, name: 'Tom Wilson', points: 11890, streak: 38, badge: '🥈' },
    { rank: 3, name: 'Lisa Chang', points: 11234, streak: 42, badge: '🥉' },
    { rank: 4, name: 'Ahmed Hassan', points: 10876, streak: 31, badge: '⭐' },
    { rank: 5, name: 'Sophie Miller', points: 10456, streak: 35, badge: '⭐' },
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // In a real app, this would create a new post
      alert('Post created! (This is a demo)');
      setNewPost('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Study Community</h2>
        <p className="text-gray-600">Connect with fellow learners, share progress, and stay motivated together.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'feed', label: 'Community Feed', icon: MessageCircle },
          { id: 'groups', label: 'Study Groups', icon: Users },
          { id: 'leaderboard', label: 'Leaderboard', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md flex-1 justify-center transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Progress</h3>
              <div className="space-y-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's your latest study achievement or question?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm">
                      #motivation
                    </button>
                    <button className="text-green-600 hover:bg-green-50 px-3 py-1 rounded-lg text-sm">
                      #study-tips
                    </button>
                    <button className="text-purple-600 hover:bg-purple-50 px-3 py-1 rounded-lg text-sm">
                      #success
                    </button>
                  </div>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimeAgo(post.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-gray-600">
                    <button className="flex items-center space-x-2 hover:text-red-600 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
                      <Share className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {['#study-streak', '#pomodoro', '#exam-prep', '#motivation', '#ai-study'].map((topic) => (
                  <button key={topic} className="block w-full text-left text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold text-blue-600">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold text-green-600">126</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Study Groups</span>
                  <span className="font-semibold text-purple-600">45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Groups */}
      {activeTab === 'groups' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search study groups..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Create Group</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyGroups.map((group, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${group.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Members</span>
                      <span className="font-semibold">{group.members}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <span className={`font-semibold ${group.active ? 'text-green-600' : 'text-gray-500'}`}>
                        {group.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                    Join Group
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Groups</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">CS Fundamentals</p>
                  <p className="text-sm text-blue-700">234 members • Active</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Math Olympiad</p>
                  <p className="text-sm text-gray-600">98 members • Active</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Benefits</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Shared study plans and resources</li>
                <li>• Group accountability challenges</li>
                <li>• Peer tutoring and help</li>
                <li>• Regular study sessions</li>
                <li>• Progress tracking together</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Leaderboard</h3>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div key={user.rank} className={`flex items-center space-x-4 p-4 rounded-lg ${
                    user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'
                  }`}>
                    <div className="text-2xl">{user.badge}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">#{user.rank} {user.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{user.points.toLocaleString()} points</span>
                            <span>{user.streak} day streak</span>
                          </div>
                        </div>
                        {user.rank <= 3 && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-orange-600">Top Performer</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Ranking</h3>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-blue-600">#47</div>
                <p className="text-gray-600">out of 2,847 members</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Points</span>
                    <span className="font-semibold">8,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Streak</span>
                    <span className="font-semibold">23 days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Earn Points</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Complete study session</span>
                  <span className="font-semibold text-blue-600">+50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily streak bonus</span>
                  <span className="font-semibold text-green-600">+25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Help community member</span>
                  <span className="font-semibold text-purple-600">+30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Share study tip</span>
                  <span className="font-semibold text-orange-600">+20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}