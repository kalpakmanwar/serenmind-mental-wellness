import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Flame, Trophy, Calendar, CheckCircle2, Pause, Archive, Trash2, X } from 'lucide-react';
import { goalService } from '@/services/api';
import { Goal, GoalRequest, GoalType, GoalPeriod, GoalStatus } from '@/types';
import { toast } from 'react-hot-toast';

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGoal, setNewGoal] = useState<GoalRequest>({
    title: '',
    description: '',
    type: GoalType.CUSTOM,
    targetCount: 7,
    period: GoalPeriod.WEEKLY,
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await goalService.getAll();
      setGoals(data);
    } catch (error) {
      toast.error('Failed to load goals');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    if (!newGoal.title.trim()) {
      toast.error('Please enter a goal title');
      return;
    }

    try {
      const created = await goalService.create(newGoal);
      setGoals([created, ...goals]);
      setShowCreateModal(false);
      setNewGoal({
        title: '',
        description: '',
        type: GoalType.CUSTOM,
        targetCount: 7,
        period: GoalPeriod.WEEKLY,
      });
      toast.success('Goal created! 🎯');
    } catch (error) {
      toast.error('Failed to create goal');
      console.error(error);
    }
  };

  const handleRecordProgress = async (goalId: number) => {
    try {
      const updated = await goalService.recordProgress(goalId);
      setGoals(goals.map(g => g.id === goalId ? updated : g));
      
      if (updated.currentStreak > 1) {
        toast.success(`🔥 ${updated.currentStreak} day streak!`);
      } else {
        toast.success('Progress recorded!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to record progress');
    }
  };

  const handleUpdateStatus = async (goalId: number, status: GoalStatus) => {
    try {
      const updated = await goalService.updateStatus(goalId, status);
      setGoals(goals.map(g => g.id === goalId ? updated : g));
      toast.success(`Goal ${status.toLowerCase()}`);
    } catch (error) {
      toast.error('Failed to update goal status');
    }
  };

  const handleDeleteGoal = async (goalId: number) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;

    try {
      await goalService.delete(goalId);
      setGoals(goals.filter(g => g.id !== goalId));
      toast.success('Goal deleted');
    } catch (error) {
      toast.error('Failed to delete goal');
    }
  };

  const getGoalTypeLabel = (type: GoalType) => {
    const labels = {
      [GoalType.MOOD_TRACKING]: '🌟 Mood Tracking',
      [GoalType.JOURNALING]: '📝 Journaling',
      [GoalType.AI_CHAT]: '💬 AI Support',
      [GoalType.CUSTOM]: '🎯 Custom',
    };
    return labels[type];
  };

  const getPeriodLabel = (period: GoalPeriod) => {
    return period.toLowerCase().replace('ly', '');
  };

  const activeGoals = goals.filter(g => g.status === GoalStatus.ACTIVE);
  const completedGoals = goals.filter(g => g.status === GoalStatus.COMPLETED);
  const totalStreaks = goals.reduce((sum, g) => sum + g.currentStreak, 0);
  const longestStreak = Math.max(...goals.map(g => g.longestStreak), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Target className="w-10 h-10 text-blue-600" />
              Your Goals & Streaks
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Track your wellness journey one goal at a time</p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            New Goal
          </motion.button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Goals', value: activeGoals.length, icon: Target, color: 'from-blue-500 to-cyan-500' },
            { label: 'Completed', value: completedGoals.length, icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
            { label: 'Total Streaks', value: `${totalStreaks} 🔥`, icon: Flame, color: 'from-orange-500 to-red-500' },
            { label: 'Longest Streak', value: `${longestStreak} days`, icon: Trophy, color: 'from-purple-500 to-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Goals List */}
        {activeGoals.length === 0 && completedGoals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Target className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No goals yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first goal to start building healthy habits!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Create Your First Goal
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {activeGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{goal.title}</h3>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                        {getGoalTypeLabel(goal.type)}
                      </span>
                    </div>
                    {goal.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{goal.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {goal.targetCount}x per {getPeriodLabel(goal.period)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {goal.currentStreak} day streak
                      </span>
                      {goal.longestStreak > 0 && (
                        <span className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-purple-500" />
                          Best: {goal.longestStreak}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(goal.id, GoalStatus.PAUSED)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Pause goal"
                    >
                      <Pause className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete goal"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progress: {goal.currentProgress}/{goal.targetCount}
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {goal.progressPercentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(goal.progressPercentage, 100)}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleRecordProgress(goal.id)}
                  disabled={goal.isCompletedToday}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    goal.isCompletedToday
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
                  }`}
                >
                  {goal.isCompletedToday ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Completed Today!
                    </span>
                  ) : (
                    'Mark as Done Today'
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Create Goal Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Goal</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Goal Title *
                    </label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="E.g., Daily meditation"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      placeholder="Optional description"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Goal Type
                    </label>
                    <select
                      value={newGoal.type}
                      onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as GoalType })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value={GoalType.MOOD_TRACKING}>🌟 Mood Tracking</option>
                      <option value={GoalType.JOURNALING}>📝 Journaling</option>
                      <option value={GoalType.AI_CHAT}>💬 AI Support</option>
                      <option value={GoalType.CUSTOM}>🎯 Custom</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Target Count
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newGoal.targetCount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetCount: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Period
                      </label>
                      <select
                        value={newGoal.period}
                        onChange={(e) => setNewGoal({ ...newGoal, period: e.target.value as GoalPeriod })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value={GoalPeriod.DAILY}>Daily</option>
                        <option value={GoalPeriod.WEEKLY}>Weekly</option>
                        <option value={GoalPeriod.MONTHLY}>Monthly</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleCreateGoal}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Create Goal
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Goals;

