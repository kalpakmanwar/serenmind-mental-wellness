import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  BookOpen,
  Download
} from 'lucide-react';
import { moodApi, journalApi, aiApi, reportService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

interface DayData {
  date: string;
  hasMood: boolean;
  hasJournal: boolean;
  moodScore?: number;
  energyLevel?: number;
  stressLevel?: number;
  journalCount: number;
}

const MonthlyCalendar: React.FC = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<Map<string, DayData>>(new Map());
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [monthSummary, setMonthSummary] = useState<{
    avgMood: number;
    avgEnergy: number;
    avgStress: number;
    daysTracked: number;
    totalDaysInMonth: number;
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Load month data
  useEffect(() => {
    loadMonthData();
  }, [currentDate]);

  const loadMonthData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59);

      // Fetch all moods for the month
      const moods = await moodApi.getAll();
      const journals = await journalApi.getAll();

      const dataMap = new Map<string, DayData>();

      // Process mood data
      moods.forEach((mood: any) => {
        const moodDate = new Date(mood.timestamp);
        if (moodDate >= startDate && moodDate <= endDate) {
          // Fix timezone issue - use local date string
          const dateKey = `${moodDate.getFullYear()}-${String(moodDate.getMonth() + 1).padStart(2, '0')}-${String(moodDate.getDate()).padStart(2, '0')}`;
          const existing = dataMap.get(dateKey);
          
          if (!existing || !existing.moodScore || mood.moodScore > existing.moodScore) {
            dataMap.set(dateKey, {
              date: dateKey,
              hasMood: true,
              hasJournal: existing?.hasJournal || false,
              moodScore: mood.moodScore,
              energyLevel: mood.energyLevel,
              stressLevel: mood.stressLevel,
              journalCount: existing?.journalCount || 0
            });
          }
        }
      });

      // Process journal data
      journals.forEach((journal: any) => {
        const journalDate = new Date(journal.createdAt);
        if (journalDate >= startDate && journalDate <= endDate) {
          // Fix timezone issue - use local date string
          const dateKey = `${journalDate.getFullYear()}-${String(journalDate.getMonth() + 1).padStart(2, '0')}-${String(journalDate.getDate()).padStart(2, '0')}`;
          const existing = dataMap.get(dateKey);
          
          dataMap.set(dateKey, {
            date: dateKey,
            hasMood: existing?.hasMood || false,
            hasJournal: true,
            moodScore: existing?.moodScore,
            energyLevel: existing?.energyLevel,
            stressLevel: existing?.stressLevel,
            journalCount: (existing?.journalCount || 0) + 1
          });
        }
      });

      setMonthData(dataMap);

      // Calculate monthly summary
      let totalMood = 0;
      let totalEnergy = 0;
      let totalStress = 0;
      let moodCount = 0;

      dataMap.forEach(day => {
        if (day.hasMood && day.moodScore) {
          totalMood += day.moodScore;
          totalEnergy += day.energyLevel || 0;
          totalStress += day.stressLevel || 0;
          moodCount++;
        }
      });

      if (moodCount > 0) {
        setMonthSummary({
          avgMood: totalMood / moodCount,
          avgEnergy: totalEnergy / moodCount,
          avgStress: totalStress / moodCount,
          daysTracked: moodCount,
          totalDaysInMonth: daysInMonth
        });
      } else {
        setMonthSummary(null);
      }
    } catch (error) {
      console.error('Error loading month data:', error);
      toast.error('Failed to load calendar data');
    } finally {
      setLoading(false);
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    // Fix timezone issue - use local date string instead of UTC
    const localDate = new Date(year, month, day);
    const dateKey = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
    const dayData = monthData.get(dateKey);
    
    console.log('🔍 Clicked day:', day, 'dateKey:', dateKey, 'dayData:', dayData);
    
    if (dayData) {
      setSelectedDay(dayData);
    } else {
      setSelectedDay({
        date: dateKey,
        hasMood: false,
        hasJournal: false,
        journalCount: 0
      });
    }
  };

  const handleGenerateMonthlyReport = async () => {
    if (!user) return;

    setGeneratingReport(true);
    const loadingToast = toast.loading('Generating monthly report...');

    try {
      const startDate = new Date(year, month, 1).toISOString();
      const endDate = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

      const report = await aiApi.generateReport({
        reportType: 'MONTHLY_REPORT',
        startDate,
        endDate
      });

      toast.success('Monthly report generated successfully!', { id: loadingToast });
      
      // Download the report
      await reportService.download(report.id);
      toast.success('Report downloaded!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate monthly report', { id: loadingToast });
    } finally {
      setGeneratingReport(false);
    }
  };

  const getMoodColor = (moodScore?: number) => {
    if (!moodScore) return 'bg-gray-100';
    if (moodScore >= 8) return 'bg-green-500';
    if (moodScore >= 6) return 'bg-blue-500';
    if (moodScore >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalSlots = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalSlots; i++) {
      const day = i - firstDayOfMonth + 1;
      const isValidDay = day > 0 && day <= daysInMonth;
      // Fix timezone issue - use local date string
      const dateKey = isValidDay ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
      const dayData = isValidDay ? monthData.get(dateKey) : null;
      const isToday = isValidDay && 
        day === new Date().getDate() && 
        month === new Date().getMonth() && 
        year === new Date().getFullYear();

      days.push(
        <motion.div
          key={i}
          whileHover={isValidDay ? { scale: 1.05 } : {}}
          whileTap={isValidDay ? { scale: 0.95 } : {}}
          onClick={() => isValidDay && handleDayClick(day)}
          className={`
            relative aspect-square p-2 rounded-lg cursor-pointer
            transition-all duration-200
            ${!isValidDay ? 'bg-transparent cursor-default' : ''}
            ${isToday ? 'ring-2 ring-primary-500 ring-offset-2' : ''}
            ${dayData?.hasMood && dayData.moodScore
              ? getMoodColor(dayData.moodScore) + ' text-white shadow-md font-bold' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold'
            }
          `}
        >
          {isValidDay && (
            <>
              <div className="text-lg">
                {day}
              </div>
              
              {dayData && (
                <div className="absolute bottom-1 right-1 flex gap-1">
                  {dayData.hasMood && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" title="Has mood entry" />
                  )}
                  {dayData.hasJournal && (
                    <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" title="Has journal" />
                  )}
                </div>
              )}

              {isToday && (
                <div className="absolute top-1 right-1 text-xs font-bold">
                  📍
                </div>
              )}
            </>
          )}
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📅 Monthly Wellness Overview
          </h2>
        </div>

        <button
          onClick={handleGenerateMonthlyReport}
          disabled={generatingReport}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg
                   hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          {generatingReport ? 'Generating...' : 'Monthly Report'}
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {monthNames[month]} {year}
        </h3>

        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div>
        {/* Day names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map(name => (
            <div key={name} className="text-center text-sm font-bold text-gray-700 dark:text-gray-300 py-2">
              {name}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Great Mood (8-10)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Good Mood (6-7)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Okay Mood (4-5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Low Mood (1-3)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 border-2 border-gray-400 rounded" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">No Data</span>
        </div>
      </div>

      {/* Monthly Summary */}
      {monthSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-primary-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              📊 Monthly Summary - {monthNames[month]} {year}
            </h3>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {monthSummary.daysTracked} of {monthSummary.totalDaysInMonth} days tracked
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-300 rounded-lg p-4 shadow-md hover:shadow-xl hover:border-orange-400 cursor-pointer"
            >
              <div className="text-sm font-semibold text-orange-900 mb-1">Average Mood</div>
              <div className="text-3xl font-bold text-orange-700">
                {monthSummary.avgMood.toFixed(1)}
                <span className="text-lg text-orange-600">/10</span>
              </div>
              <div className="text-xs font-semibold text-orange-800 mt-1">
                {monthSummary.avgMood >= 7 ? '😊 Great!' : monthSummary.avgMood >= 5 ? '😐 Good' : '😔 Challenging'}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300 rounded-lg p-4 shadow-md hover:shadow-xl hover:border-green-400 cursor-pointer"
            >
              <div className="text-sm font-semibold text-green-900 mb-1">Average Energy</div>
              <div className="text-3xl font-bold text-green-700">
                {monthSummary.avgEnergy.toFixed(1)}
                <span className="text-lg text-green-600">/10</span>
              </div>
              <div className="text-xs font-semibold text-green-800 mt-1">
                {monthSummary.avgEnergy >= 7 ? '⚡ High' : monthSummary.avgEnergy >= 5 ? '⚡ Moderate' : '⚡ Low'}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-300 rounded-lg p-4 shadow-md hover:shadow-xl hover:border-purple-400 cursor-pointer"
            >
              <div className="text-sm font-semibold text-purple-900 mb-1">Average Stress</div>
              <div className="text-3xl font-bold text-purple-700">
                {monthSummary.avgStress.toFixed(1)}
                <span className="text-lg text-purple-600">/10</span>
              </div>
              <div className="text-xs font-semibold text-purple-800 mt-1">
                {monthSummary.avgStress <= 4 ? '✅ Low' : monthSummary.avgStress <= 6 ? '⚠️ Moderate' : '🔴 High'}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-300 rounded-lg p-4 shadow-md hover:shadow-xl hover:border-blue-400 cursor-pointer"
            >
              <div className="text-sm font-semibold text-blue-900 mb-1">Completion Rate</div>
              <div className="text-3xl font-bold text-blue-700">
                {((monthSummary.daysTracked / monthSummary.totalDaysInMonth) * 100).toFixed(0)}
                <span className="text-lg text-blue-600">%</span>
              </div>
              <div className="text-xs font-semibold text-blue-800 mt-1">
                {monthSummary.daysTracked} days logged
              </div>
            </motion.div>
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              💡 Tip: Track daily for the most accurate monthly insights!
            </p>
            <button
              onClick={handleGenerateMonthlyReport}
              disabled={generatingReport}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 font-bold shadow-xl border-2 border-blue-400"
            >
              <Download className="w-5 h-5" />
              {generatingReport ? 'Generating...' : 'Download PDF Report'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Selected Day Details - POPUP MODAL */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedDay(null)}
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDay(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full 
                       bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
                       text-gray-600 dark:text-gray-300 transition-colors"
            >
              ✕
            </button>

            {/* Date Header */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                📅 DAY DETAILS
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
            </div>

            {/* Content */}
            {selectedDay.hasMood || selectedDay.hasJournal ? (
              <div className="space-y-4">
                {/* Mood Data */}
                {selectedDay.hasMood && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 
                               rounded-xl p-4 border-2 border-blue-200 dark:border-blue-700">
                    <h5 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-3">
                      😊 MOOD TRACKING
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl mb-1">😊</div>
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Mood</div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {selectedDay.moodScore}
                          <span className="text-sm text-gray-500">/10</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-1">⚡</div>
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Energy</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {selectedDay.energyLevel}
                          <span className="text-sm text-gray-500">/10</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-1">🎯</div>
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Stress</div>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {selectedDay.stressLevel}
                          <span className="text-sm text-gray-500">/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Journal Data */}
                {selectedDay.hasJournal && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 
                               rounded-xl p-4 border-2 border-purple-200 dark:border-purple-700">
                    <h5 className="text-sm font-bold text-purple-900 dark:text-purple-200 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      JOURNAL ENTRIES
                    </h5>
                    <div className="text-center py-2">
                      <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                        {selectedDay.journalCount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {selectedDay.journalCount === 1 ? 'entry' : 'entries'} written
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <div className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No data recorded
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  Track your mood and write journal entries to see them here!
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <button
                onClick={() => setSelectedDay(null)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                         rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 
                         transition-all duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MonthlyCalendar;

