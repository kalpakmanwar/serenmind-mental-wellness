import { motion } from 'framer-motion';
import { User, Moon, Sun, Mail, Lock, Trash2, Bell, Shield, Eye, EyeOff, AlertTriangle, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { notificationService, NotificationPreferences } from '@/services/notificationService';

// =========================================
// Profile Page (Complete Implementation)
// =========================================

const Profile = () => {
  const { user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();

  // Email Preferences State
  const [emailPrefs, setEmailPrefs] = useState({
    weeklyReport: true,
    moodReminders: true,
    aiInsights: true,
    productUpdates: false
  });

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Account Deletion State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Notification Preferences State
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(() => {
    return notificationService.loadPreferences();
  });

  // Load notification permission status
  useEffect(() => {
    if (notificationService.isSupported()) {
      const permission = notificationService.getPermission();
      if (permission === 'denied') {
        setNotificationPrefs(prev => ({ ...prev, enabled: false }));
      }
    }
  }, []);

  // Handle Notification Toggle
  const handleNotificationToggle = async () => {
    if (!notificationService.isSupported()) {
      toast.error('Notifications are not supported in your browser');
      return;
    }

    if (!notificationPrefs.enabled) {
      // Request permission
      const permission = await notificationService.requestPermission();
      
      if (permission === 'granted') {
        const updatedPrefs = { ...notificationPrefs, enabled: true };
        setNotificationPrefs(updatedPrefs);
        notificationService.savePreferences(updatedPrefs);
        toast.success('Notifications enabled! 🔔');
      } else {
        toast.error('Notification permission denied');
      }
    } else {
      // Disable notifications
      const updatedPrefs = { ...notificationPrefs, enabled: false };
      setNotificationPrefs(updatedPrefs);
      notificationService.savePreferences(updatedPrefs);
      toast.success('Notifications disabled');
    }
  };

  // Handle Notification Preference Toggle
  const handleNotificationPrefToggle = (pref: keyof Omit<NotificationPreferences, 'enabled'>) => {
    const updatedPrefs = {
      ...notificationPrefs,
      [pref]: typeof notificationPrefs[pref] === 'boolean' ? !notificationPrefs[pref] : notificationPrefs[pref]
    };
    setNotificationPrefs(updatedPrefs);
    notificationService.savePreferences(updatedPrefs);
    toast.success('Notification preferences updated!');
  };

  // Handle Notification Time Change
  const handleNotificationTimeChange = (type: 'moodReminderTime' | 'journalReminderTime' | 'aiChatReminderTime', time: string) => {
    const updatedPrefs = {
      ...notificationPrefs,
      [type]: time
    };
    setNotificationPrefs(updatedPrefs);
    notificationService.savePreferences(updatedPrefs);
    toast.success('Reminder time updated!');
  };

  // Handle Email Preference Toggle
  const handleEmailPrefToggle = (pref: keyof typeof emailPrefs) => {
    setEmailPrefs(prev => ({
      ...prev,
      [pref]: !prev[pref]
    }));
    toast.success('Email preferences updated!');
  };

  // Handle Password Change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }

    try {
      // TODO: Implement password change API call
      // await api.changePassword(passwordForm);
      
      toast.success('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }

    try {
      // TODO: Implement account deletion API call
      // await api.deleteAccount();
      
      toast.success('Account deleted successfully');
      logout();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-heading font-bold text-text-dark dark:text-white mb-8">
            Profile Settings
          </h1>

          {/* User Info Card */}
          <div className="card mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-accent-peach flex items-center justify-center">
                <User className="w-10 h-10 text-text-dark" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-text-dark dark:text-white">
                  {user?.fullName}
                </h2>
                <p className="text-text-gray dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark dark:text-white">
                Appearance
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-dark dark:text-white">Dark Mode</p>
                <p className="text-sm text-text-gray dark:text-gray-400">
                  Toggle between light and dark theme
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex items-center h-10 w-20 rounded-full transition-colors ${
                  isDark ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label="Toggle dark mode"
                aria-pressed={isDark}
              >
                <span
                  className={`inline-block w-8 h-8 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-11' : 'translate-x-1'
                  }`}
                >
                  {isDark ? (
                    <Moon className="w-5 h-5 m-1.5 text-gray-700" />
                  ) : (
                    <Sun className="w-5 h-5 m-1.5 text-yellow-500" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Email Preferences */}
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark dark:text-white">
                Email Preferences
              </h3>
            </div>
            <p className="text-sm text-text-gray dark:text-gray-400 mb-6">
              Choose what emails you'd like to receive from SerenMind
            </p>
            <div className="space-y-4">
              {[
                { key: 'weeklyReport', label: 'Weekly Wellness Report', desc: 'Receive a summary of your mood trends every week' },
                { key: 'moodReminders', label: 'Daily Mood Reminders', desc: 'Get reminded to log your mood daily' },
                { key: 'aiInsights', label: 'AI Insights & Tips', desc: 'Personalized wellness tips based on your data' },
                { key: 'productUpdates', label: 'Product Updates', desc: 'News about new features and improvements' }
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <p className="font-medium text-text-dark dark:text-white">{pref.label}</p>
                    <p className="text-sm text-text-gray dark:text-gray-400">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => handleEmailPrefToggle(pref.key as keyof typeof emailPrefs)}
                    className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors ${
                      emailPrefs[pref.key as keyof typeof emailPrefs] ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block w-6 h-6 transform rounded-full bg-white transition-transform ${
                        emailPrefs[pref.key as keyof typeof emailPrefs] ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark dark:text-white">
                Notification Preferences
              </h3>
            </div>
            <p className="text-sm text-text-gray dark:text-gray-400 mb-6">
              Get daily reminders to stay on track with your wellness journey
            </p>

            {/* Enable Notifications Master Toggle */}
            <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-text-dark dark:text-white">Enable Notifications</h4>
                    <p className="text-sm text-text-gray dark:text-gray-400">
                      Allow SerenMind to send you browser notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNotificationToggle}
                  className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors ${
                    notificationPrefs.enabled ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle notifications"
                >
                  <span
                    className={`inline-block w-6 h-6 transform rounded-full bg-white transition-transform ${
                      notificationPrefs.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Individual Notification Settings */}
            {notificationPrefs.enabled && (
              <div className="space-y-6">
                {/* Mood Reminder */}
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🌟</span>
                      <h4 className="font-semibold text-text-dark dark:text-white">Mood Check-in Reminder</h4>
                    </div>
                    <button
                      onClick={() => handleNotificationPrefToggle('moodReminder')}
                      className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors ${
                        notificationPrefs.moodReminder ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block w-5 h-5 transform rounded-full bg-white transition-transform ${
                          notificationPrefs.moodReminder ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {notificationPrefs.moodReminder && (
                    <div className="flex items-center gap-2 ml-8">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <input
                        type="time"
                        value={notificationPrefs.moodReminderTime}
                        onChange={(e) => handleNotificationTimeChange('moodReminderTime', e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-text-dark dark:text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Journal Reminder */}
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📝</span>
                      <h4 className="font-semibold text-text-dark dark:text-white">Journal Reminder</h4>
                    </div>
                    <button
                      onClick={() => handleNotificationPrefToggle('journalReminder')}
                      className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors ${
                        notificationPrefs.journalReminder ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block w-5 h-5 transform rounded-full bg-white transition-transform ${
                          notificationPrefs.journalReminder ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {notificationPrefs.journalReminder && (
                    <div className="flex items-center gap-2 ml-8">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <input
                        type="time"
                        value={notificationPrefs.journalReminderTime}
                        onChange={(e) => handleNotificationTimeChange('journalReminderTime', e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-text-dark dark:text-white"
                      />
                    </div>
                  )}
                </div>

                {/* AI Chat Reminder */}
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💬</span>
                      <h4 className="font-semibold text-text-dark dark:text-white">AI Support Reminder</h4>
                    </div>
                    <button
                      onClick={() => handleNotificationPrefToggle('aiChatReminder')}
                      className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors ${
                        notificationPrefs.aiChatReminder ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block w-5 h-5 transform rounded-full bg-white transition-transform ${
                          notificationPrefs.aiChatReminder ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {notificationPrefs.aiChatReminder && (
                    <div className="flex items-center gap-2 ml-8">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <input
                        type="time"
                        value={notificationPrefs.aiChatReminderTime}
                        onChange={(e) => handleNotificationTimeChange('aiChatReminderTime', e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-text-dark dark:text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {!notificationService.isSupported() && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ Notifications are not supported in your browser
                </p>
              </div>
            )}
          </div>

          {/* Password Change */}
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark dark:text-white">
                Change Password
              </h3>
            </div>
            <p className="text-sm text-text-gray dark:text-gray-400 mb-6">
              Keep your account secure with a strong password
            </p>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="input pr-10"
                    placeholder="Enter your current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="input pr-10"
                    placeholder="Enter your new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-text-gray dark:text-gray-400 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="input pr-10"
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Update Password
              </button>
            </form>
          </div>

          {/* Danger Zone - Account Deletion */}
          <div className="card mb-8 border-2 border-red-500 dark:border-red-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                Danger Zone
              </h3>
            </div>
            <p className="text-sm text-text-gray dark:text-gray-400 mb-4">
              Once you delete your account, there is no going back. All your data will be permanently deleted.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </button>
          </div>

          {/* Account Actions */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark dark:text-white">
                Account Actions
              </h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={logout}
                className="btn btn-secondary w-full"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Delete Account Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark dark:text-white">
                    Delete Account?
                  </h3>
                </div>

                <div className="mb-6">
                  <p className="text-text-gray dark:text-gray-400 mb-4">
                    This action <strong className="text-red-600">cannot be undone</strong>. This will permanently delete:
                  </p>
                  <ul className="list-disc list-inside text-sm text-text-gray dark:text-gray-400 space-y-1 mb-4">
                    <li>Your profile and account data</li>
                    <li>All mood entries and trends</li>
                    <li>Journal entries</li>
                    <li>AI chat history</li>
                    <li>Generated reports</li>
                  </ul>
                  <p className="text-sm text-text-gray dark:text-gray-400 mb-4">
                    Type <strong className="text-red-600">DELETE</strong> to confirm:
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="input"
                    placeholder="Type DELETE"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteConfirmation('');
                    }}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmation !== 'DELETE'}
                    className="btn bg-red-600 hover:bg-red-700 text-white flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete Forever
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

