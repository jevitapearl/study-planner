import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Clock, 
  Target,
  Zap,
  Award,
  Play,
  Pause,
  Trophy,
  Star,
  Gift
} from 'lucide-react';

interface BlockedSite {
  url: string;
  category: string;
  blockedCount: number;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  unlocked: boolean;
}

export function ProcrastinationBlocker() {
  const [isBlocking, setIsBlocking] = useState(false);
  const [focusTime, setFocusTime] = useState(25); // Pomodoro default
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);

  const blockedSites: BlockedSite[] = [
    { url: 'youtube.com', category: 'Entertainment', blockedCount: 23 },
    { url: 'instagram.com', category: 'Social Media', blockedCount: 18 },
    { url: 'twitter.com', category: 'Social Media', blockedCount: 15 },
    { url: 'reddit.com', category: 'News/Forum', blockedCount: 12 },
    { url: 'netflix.com', category: 'Entertainment', blockedCount: 8 },
  ];

  const rewards: Reward[] = [
    { id: '1', name: '30-min Break', description: 'Unlock a guilt-free 30-minute break', points: 100, unlocked: true },
    { id: '2', name: 'Favorite Snack', description: 'Treat yourself to your favorite snack', points: 200, unlocked: true },
    { id: '3', name: 'Movie Night', description: 'Watch a movie of your choice', points: 500, unlocked: true },
    { id: '4', name: 'Gaming Session', description: '2-hour gaming session', points: 750, unlocked: true },
    { id: '5', name: 'Weekend Outing', description: 'Go out with friends this weekend', points: 1000, unlocked: true },
    { id: '6', name: 'New Book', description: 'Buy that book you\'ve been wanting', points: 1500, unlocked: false },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setUserPoints(prev => prev + 50); // Reward for completing session
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTime]);

  const startFocusSession = () => {
    setCurrentTime(focusTime * 60);
    setIsRunning(true);
    setIsBlocking(true);
  };

  const pauseSession = () => {
    setIsRunning(!isRunning);
  };

  const stopSession = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setIsBlocking(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const claimReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(prev => prev - reward.points);
      // In a real app, this would trigger the reward
      alert(`Reward claimed: ${reward.name}! Enjoy! 🎉`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Focus Shield & Rewards</h2>
        <p className="text-gray-600">Block distractions, stay focused, and earn rewards for your dedication.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Focus Timer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-orange-600" />
                Focus Timer
              </h3>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-900">{userPoints} points</span>
              </div>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-8">
              <div className="w-48 h-48 mx-auto mb-6 relative">
                <div className="w-full h-full rounded-full border-8 border-gray-200 flex items-center justify-center relative overflow-hidden">
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-orange-500 transition-all duration-1000"
                    style={{
                      clipPath: currentTime > 0 ? `inset(0 ${100 - (currentTime / (focusTime * 60)) * 100}% 0 0)` : 'inset(0 100% 0 0)'
                    }}
                  ></div>
                  <div className="text-4xl font-bold text-gray-900 z-10 relative">
                    {isRunning || currentTime > 0 ? formatTime(currentTime) : `${focusTime}:00`}
                  </div>
                </div>
              </div>

              {/* Time Presets */}
              {!isRunning && currentTime === 0 && (
                <div className="flex justify-center space-x-4 mb-6">
                  {[15, 25, 45, 60].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => setFocusTime(minutes)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        focusTime === minutes
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {minutes}m
                    </button>
                  ))}
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                {!isRunning && currentTime === 0 ? (
                  <button
                    onClick={startFocusSession}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Focus Session</span>
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={pauseSession}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2"
                    >
                      <Pause className="w-5 h-5" />
                      <span>{isRunning ? 'Pause' : 'Resume'}</span>
                    </button>
                    <button
                      onClick={stopSession}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Blocking Status */}
            <div className={`p-4 rounded-lg border ${
              isBlocking 
                ? 'bg-red-50 border-red-200 text-red-800' 
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}>
              <div className="flex items-center space-x-2">
                <Shield className={`w-5 h-5 ${isBlocking ? 'text-red-600' : 'text-gray-400'}`} />
                <span className="font-semibold">
                  {isBlocking ? 'Blocking Mode Active' : 'Blocking Mode Inactive'}
                </span>
              </div>
              <p className="text-sm mt-1">
                {isBlocking 
                  ? 'Distracting websites are currently blocked. Stay focused!' 
                  : 'Start a focus session to activate website blocking.'}
              </p>
            </div>
          </div>

          {/* Blocked Sites */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-600" />
              Blocked Sites Today
            </h3>
            <div className="space-y-3">
              {blockedSites.map((site, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{site.url}</p>
                    <p className="text-sm text-gray-600">{site.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">{site.blockedCount}</p>
                    <p className="text-xs text-gray-500">blocks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rewards System */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-purple-600" />
              Available Rewards
            </h3>
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.id} className={`p-4 rounded-lg border ${
                  reward.unlocked && userPoints >= reward.points
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{reward.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">{reward.points}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                  <button
                    onClick={() => claimReward(reward)}
                    disabled={!reward.unlocked || userPoints < reward.points}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      reward.unlocked && userPoints >= reward.points
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {userPoints >= reward.points ? 'Claim Reward' : 'Not enough points'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
              Today's Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Focus Sessions</span>
                <span className="font-semibold text-blue-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Focus Time</span>
                <span className="font-semibold text-green-600">1h 45m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sites Blocked</span>
                <span className="font-semibold text-red-600">76</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Points Earned</span>
                <span className="font-semibold text-purple-600">150</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}