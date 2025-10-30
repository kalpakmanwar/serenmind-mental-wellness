import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Heart, Zap, Cloud, Loader2, BookOpen, MessageCircle, FileText, ArrowRight, CheckCircle, Target, Flame } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { moodApi, journalApi, goalService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { getTodayDate, getMoodEmoji, formatDate } from '@/utils/helpers';
import type { MoodEntry, MoodTrends, JournalEntry, Goal } from '@/types';
import toast from 'react-hot-toast';
import { BlobPeach } from '@/assets/svg';
import MonthlyCalendar from '@/components/dashboard/MonthlyCalendar';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// =========================================
// Dashboard Page
// =========================================

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [trends, setTrends] = useState<MoodTrends | null>(null);
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([]);
  const [journalCount, setJournalCount] = useState(0);
  const [hasUsedAi, setHasUsedAi] = useState(false);
  const [activeGoals, setActiveGoals] = useState<Goal[]>([]);

  // Mood form state
  const [moodForm, setMoodForm] = useState({
    date: getTodayDate(),
    mood: 'Happy',
    moodScore: 7,
    energyLevel: 7,
    stressLevel: 3,
    notes: '',
  });

  const moodOptions = [
    { label: 'Very Happy', emoji: '😄', value: 'Very Happy' },
    { label: 'Happy', emoji: '😊', value: 'Happy' },
    { label: 'Okay', emoji: '😐', value: 'Okay' },
    { label: 'Sad', emoji: '😔', value: 'Sad' },
    { label: 'Anxious', emoji: '😰', value: 'Anxious' },
    { label: 'Calm', emoji: '😌', value: 'Calm' },
  ];

  // Load data
  useEffect(() => {
    loadDashboardData();
    // Check if user has used AI chat
    const aiUsed = localStorage.getItem(`hasUsedAi_${user?.id}`) === 'true';
    setHasUsedAi(aiUsed);
  }, [user?.id]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [trendsData, entriesData, journalData, goalsData] = await Promise.all([
        moodApi.getTrends(),
        moodApi.getAll(),
        journalApi.getAll().catch(() => []), // Gracefully handle if journals fail
        goalService.getActive().catch(() => []), // Gracefully handle if goals fail
      ]);

      console.log('📊 Dashboard Data Loaded:', {
        trendsData,
        totalEntries: entriesData.length,
        journalCount: journalData.length,
        activeGoalsCount: goalsData.length,
        trendsSummary: trendsData?.summary,
      });

      setTrends(trendsData);
      setRecentEntries(entriesData.slice(0, 5)); // Last 5 entries
      setJournalCount(journalData.length); // Count of journal entries
      setActiveGoals(goalsData.slice(0, 3)); // Top 3 active goals
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle mood submission
  const handleSubmitMood = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      
      // Convert date string to ISO timestamp for backend
      const timestamp = moodForm.date 
        ? new Date(moodForm.date + 'T12:00:00').toISOString() 
        : new Date().toISOString();
      
      // Send only the fields the backend expects
      const requestData = {
        timestamp,
        moodScore: moodForm.moodScore,
        energyLevel: moodForm.energyLevel,
        stressLevel: moodForm.stressLevel,
        notes: moodForm.notes || '',
      };
      
      console.log('📝 Saving mood entry:', requestData);
      await moodApi.create(requestData);
      toast.success('Mood entry saved! 🎉');

      // Reload dashboard data
      await loadDashboardData();

      // Reset form
      setMoodForm({
        ...moodForm,
        notes: '',
      });
    } catch (error) {
      console.error('Failed to save mood:', error);
      toast.error('Failed to save mood entry');
    } finally {
      setIsSaving(false);
    }
  };

  // Chart configuration
  const chartData = trends
    ? {
        labels: trends.dates.map((date) => formatDate(date, 'MMM DD')),
        datasets: [
          {
            label: '😊 Mood Score',
            data: trends.moodScores,
            borderColor: 'rgb(251, 146, 60)', // Orange for mood
            backgroundColor: 'rgba(251, 146, 60, 0.2)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: 'rgb(251, 146, 60)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          },
          {
            label: '⚡ Energy Level',
            data: trends.energyLevels,
            borderColor: 'rgb(34, 197, 94)', // Green for energy
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: 'rgb(34, 197, 94)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          },
          {
            label: '😰 Stress Level',
            data: trends.stressLevels,
            borderColor: 'rgb(168, 85, 247)', // Purple for stress
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: 'rgb(168, 85, 247)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '/10';
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-accent-peach" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative Blob */}
      <BlobPeach className="absolute top-0 right-0 w-96 h-96 opacity-10 animate-blob" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-heading font-bold text-text-dark dark:text-white mb-2">
            Welcome back, {user?.fullName}! 🌟
          </h1>
          <p className="text-text-gray dark:text-gray-400">
            How are you feeling today? Let's track your wellness journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mood Input */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card sticky top-24"
            >
              <h2 className="text-2xl font-semibold text-text-dark dark:text-white mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-red-500" />
                Log Your Mood
              </h2>

              <form onSubmit={handleSubmitMood} className="space-y-6">
                {/* Date */}
                <div>
                  <label htmlFor="date" className="label flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={moodForm.date}
                    onChange={(e) => setMoodForm({ ...moodForm, date: e.target.value })}
                    className="input"
                    max={getTodayDate()}
                  />
                </div>

                {/* Mood Selection */}
                <div>
                  <label className="label">How are you feeling?</label>
                  <div className="grid grid-cols-3 gap-2">
                    {moodOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setMoodForm({ ...moodForm, mood: option.value })}
                        className={`p-3 rounded-xl text-center transition-all ${
                          moodForm.mood === option.value
                            ? 'bg-accent-peach shadow-glow-peach scale-105'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-accent-peach/50'
                        }`}
                        aria-label={`Select ${option.label} mood`}
                        aria-pressed={moodForm.mood === option.value}
                      >
                        <div className="text-3xl mb-1">{option.emoji}</div>
                        <div className="text-xs font-medium text-text-dark dark:text-white">
                          {option.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood Score Slider */}
                <div>
                  <label htmlFor="moodScore" className="label">
                    Mood Score: {moodForm.moodScore}/10
                  </label>
                  <input
                    type="range"
                    id="moodScore"
                    min="1"
                    max="10"
                    value={moodForm.moodScore}
                    onChange={(e) =>
                      setMoodForm({ ...moodForm, moodScore: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-peach"
                    aria-label="Mood score slider"
                  />
                </div>

                {/* Energy Level Slider */}
                <div>
                  <label htmlFor="energyLevel" className="label flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                    Energy Level: {moodForm.energyLevel}/10
                  </label>
                  <input
                    type="range"
                    id="energyLevel"
                    min="1"
                    max="10"
                    value={moodForm.energyLevel}
                    onChange={(e) =>
                      setMoodForm({ ...moodForm, energyLevel: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-sage"
                    aria-label="Energy level slider"
                  />
                </div>

                {/* Stress Level Slider */}
                <div>
                  <label htmlFor="stressLevel" className="label flex items-center">
                    <Cloud className="w-4 h-4 mr-2 text-blue-500" />
                    Stress Level: {moodForm.stressLevel}/10
                  </label>
                  <input
                    type="range"
                    id="stressLevel"
                    min="1"
                    max="10"
                    value={moodForm.stressLevel}
                    onChange={(e) =>
                      setMoodForm({ ...moodForm, stressLevel: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-lavender"
                    aria-label="Stress level slider"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="label">
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    value={moodForm.notes}
                    onChange={(e) => setMoodForm({ ...moodForm, notes: e.target.value })}
                    className="textarea"
                    rows={3}
                    placeholder="Any thoughts or reflections..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn btn-primary w-full disabled:opacity-50"
                  aria-busy={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Mood Entry'
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Trends & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            {trends && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="card bg-gradient-to-br from-accent-peach to-accent-peach/70">
                  <h3 className="text-sm font-medium text-text-dark mb-2">Average Mood</h3>
                  <p className="text-3xl font-bold text-text-dark">
                    {trends.summary.averageMood.toFixed(1)}/10
                  </p>
                </div>
                <div className="card bg-gradient-to-br from-accent-sage to-accent-sage/70">
                  <h3 className="text-sm font-medium text-text-dark mb-2">Average Energy</h3>
                  <p className="text-3xl font-bold text-text-dark">
                    {trends.summary.averageEnergy.toFixed(1)}/10
                  </p>
                </div>
                <div className="card bg-gradient-to-br from-accent-lavender to-accent-lavender/70">
                  <h3 className="text-sm font-medium text-text-dark mb-2">Average Stress</h3>
                  <p className="text-3xl font-bold text-text-dark">
                    {trends.summary.averageStress.toFixed(1)}/10
                  </p>
                </div>
              </motion.div>
            )}

            {/* Mood Trends Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-text-dark dark:text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                  Your Trends (Last 30 Days)
                </h2>
                {trends && trends.summary.totalEntries > 0 && (
                  <span className="text-sm text-text-gray dark:text-gray-400">
                    {trends.summary.totalEntries} {trends.summary.totalEntries === 1 ? 'entry' : 'entries'}
                  </span>
                )}
              </div>

              {chartData && trends && trends.summary.totalEntries > 0 ? (
                <>
                  <div style={{ height: '400px' }}>
                    <Line data={chartData} options={chartOptions} />
                  </div>
                  
                  {/* Chart Legend Helper */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span className="text-text-gray dark:text-gray-400">Mood</span>
                        </div>
                        <p className="text-xs text-text-gray dark:text-gray-500">
                          Higher = Happier
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-text-gray dark:text-gray-400">Energy</span>
                        </div>
                        <p className="text-xs text-text-gray dark:text-gray-500">
                          Higher = More energetic
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-text-gray dark:text-gray-400">Stress</span>
                        </div>
                        <p className="text-xs text-text-gray dark:text-gray-500">
                          Lower = Less stressed
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-text-gray opacity-50" />
                  <p className="text-xl text-text-gray dark:text-gray-400 mb-2">
                    No trends yet
                  </p>
                  <p className="text-text-gray dark:text-gray-400 mb-4">
                    Start tracking your mood to see beautiful trends and patterns!
                  </p>
                  <p className="text-sm text-text-gray dark:text-gray-500">
                    💡 Tip: Track daily for the best insights
                  </p>
                </div>
              )}
            </motion.div>

            {/* Monthly Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MonthlyCalendar />
            </motion.div>

            {/* Active Goals Widget */}
            {activeGoals.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text-dark dark:text-white flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    Your Active Goals
                  </h2>
                  <button
                    onClick={() => navigate('/goals')}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors font-medium"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {activeGoals.map((goal) => (
                    <motion.div
                      key={goal.id}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800 cursor-pointer"
                      onClick={() => navigate('/goals')}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {goal.title}
                        </h3>
                        {goal.currentStreak > 0 && (
                          <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold text-sm">
                            <Flame className="w-4 h-4" />
                            {goal.currentStreak}
                          </span>
                        )}
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {goal.currentProgress}/{goal.targetCount}
                          </span>
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                            {goal.progressPercentage.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(goal.progressPercentage, 100)}%` }}
                          />
                        </div>
                      </div>

                      {goal.isCompletedToday && (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Completed today!
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {activeGoals.length === 0 && (
                  <div className="text-center py-8">
                    <Target className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No active goals yet</p>
                    <button
                      onClick={() => navigate('/goals')}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Create Your First Goal
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Recent Entries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h2 className="text-2xl font-semibold text-text-dark dark:text-white mb-6">
                Recent Entries
              </h2>

              {recentEntries.length > 0 ? (
                <div className="space-y-4">
                  {recentEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{getMoodEmoji(entry.mood)}</div>
                        <div>
                          <p className="font-medium text-text-dark dark:text-white">
                            {entry.mood}
                          </p>
                          <p className="text-sm text-text-gray dark:text-gray-400">
                            {formatDate(entry.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-text-dark dark:text-white">
                          {entry.moodScore}/10
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-text-gray dark:text-gray-400">
                  <p>No mood entries yet. Log your first mood above!</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Next Steps Workflow Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-100 via-blue-100 to-cyan-100 dark:from-indigo-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 p-8 border-b-2 border-indigo-200 dark:border-indigo-700">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <span className="text-4xl">🚀</span>
                Your Wellness Journey
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Complete these 4 simple steps to unlock your personalized wellness insights
              </p>
            </div>

            {/* Steps Grid */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1: Track Mood */}
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
                className={`relative p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                  recentEntries.length > 0
                    ? 'bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-green-800/40 border-emerald-400'
                    : 'bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 border-red-300 dark:border-red-700'
                }`}
              >
                {recentEntries.length > 0 && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400 drop-shadow-lg" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    1
                  </div>
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Track Mood</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {recentEntries.length > 0
                    ? `⚡ Great! You've logged ${recentEntries.length} mood entries.`
                    : 'Start logging your daily mood to track patterns.'}
                </p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                  recentEntries.length > 0
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 text-white'
                }`}>
                  {recentEntries.length > 0 ? '✅ Completed' : '👉 Start Here'}
                </div>
              </motion.div>

              {/* Step 2: Write Journal */}
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate('/journal')}
                className={`relative p-6 rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300 ${
                  journalCount > 0
                    ? 'bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-green-800/40 border-emerald-400'
                    : 'bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-300 dark:border-purple-700'
                }`}
              >
                {journalCount > 0 && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400 drop-shadow-lg" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    2
                  </div>
                  <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Write Journal</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {journalCount > 0
                    ? `✨ Wonderful! You've written ${journalCount} journal entries.`
                    : 'Express your thoughts and feelings privately.'}
                </p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                  journalCount > 0
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-600 text-white'
                }`}>
                  {journalCount > 0 ? '✅ Completed' : '📝 Write Now'}
                  {journalCount === 0 && <ArrowRight className="w-3 h-3" />}
                </div>
              </motion.div>

              {/* Step 3: Chat with AI */}
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate('/chat')}
                className={`relative p-6 rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300 ${
                  hasUsedAi
                    ? 'bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-green-800/40 border-emerald-400'
                    : 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-300 dark:border-blue-700'
                }`}
              >
                {hasUsedAi && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400 drop-shadow-lg" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    3
                  </div>
                  <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Support</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {hasUsedAi
                    ? '✨ Great! You\'ve chatted with our AI companion.'
                    : 'Get personalized guidance from our AI coach.'}
                </p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                  hasUsedAi
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}>
                  {hasUsedAi ? '✅ Completed' : '💬 Chat Now'}
                  {!hasUsedAi && <ArrowRight className="w-3 h-3" />}
                </div>
              </motion.div>

              {/* Step 4: Generate Report */}
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate('/reports')}
                className="relative p-6 rounded-2xl shadow-lg border-2 border-orange-400 cursor-pointer bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-600 text-white overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-orange-600 font-bold text-lg shadow-lg">
                      4
                    </div>
                    <FileText className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Get Report</h3>
                  <p className="text-sm text-white/90 mb-4">
                    Generate your comprehensive wellness report with AI insights!
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-orange-600 font-bold text-xs shadow-lg hover:bg-gray-100 transition-all">
                    🎯 Generate Now <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            </div>

              {/* Progress Bar */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Overall Progress</h3>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {Math.round(((recentEntries.length > 0 ? 1 : 0) + (journalCount > 0 ? 1 : 0) + (hasUsedAi ? 1 : 0)) / 3 * 100)}%
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((recentEntries.length > 0 ? 1 : 0) + (journalCount > 0 ? 1 : 0) + (hasUsedAi ? 1 : 0)) / 3 * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 shadow-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  💡 <strong>Pro Tip:</strong> Complete all steps daily for the most accurate wellness insights and personalized recommendations!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

