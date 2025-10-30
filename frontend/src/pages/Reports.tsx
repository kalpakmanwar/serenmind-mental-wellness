import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Trash2, Loader2, Plus, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { aiService, reportService } from '@/services/api';
import type { AiReport } from '@/types';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

// =========================================
// Reports Page Component
// =========================================

const Reports = () => {
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState<AiReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch reports on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchReports();
    }
  }, [isAuthenticated]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await reportService.getAll();
      setReports(data);
    } catch (err: any) {
      console.error('Error fetching reports:', err);
      const errorMessage = err.response?.data?.message || 'Failed to load reports';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      setSuccess(null);

      // Show loading toast
      const loadingToast = toast.loading('Generating your wellness report...');

      // Generate report with last 30 days of data
      const endDate = new Date().toISOString();
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      await aiService.generateReport({
        reportType: 'MONTHLY_REPORT',
        startDate,
        endDate
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success
      const successMessage = 'Report generated successfully! 🎉';
      setSuccess(successMessage);
      toast.success(successMessage);
      
      // Refresh reports list
      await fetchReports();
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      console.error('Error generating report:', err);
      const errorMessage = err.response?.data?.message || 'Failed to generate report. Please make sure you have some mood entries or journal entries first.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (reportId: number, reportTitle: string) => {
    try {
      setDownloadingId(reportId);
      setError(null);

      const blob = await reportService.download(reportId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportTitle.replace(/\s+/g, '_')}_${dayjs().format('YYYY-MM-DD')}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      
      const successMessage = 'Report downloaded successfully! 📥';
      setSuccess(successMessage);
      toast.success(successMessage);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error downloading report:', err);
      const errorMessage = err.response?.data?.message || 'Failed to download report';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (reportId: number) => {
    if (!confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(reportId);
      setError(null);

      await reportService.delete(reportId);
      
      // Remove from local state
      setReports(prev => prev.filter(r => r.id !== reportId));
      
      const successMessage = 'Report deleted successfully! 🗑️';
      setSuccess(successMessage);
      toast.success(successMessage);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error deleting report:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete report';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-heading text-text-dark mb-4">
            Please log in to access your reports
          </h2>
          <a href="/login" className="btn btn-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-text-dark dark:text-white mb-2">
                Wellness Reports
              </h1>
              <p className="text-text-gray dark:text-gray-400">
                AI-generated insights from your mood tracking and journal entries
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Generate new report"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Generate New Report
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-100 dark:bg-green-900 dark:bg-opacity-20 text-green-700 dark:text-green-400 rounded-2xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p>{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-700 dark:text-red-400 rounded-2xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent-peach" />
          </div>
        ) : reports.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center py-12"
          >
            <FileText className="w-16 h-16 mx-auto mb-4 text-text-gray opacity-50" />
            <h2 className="text-2xl font-heading font-bold text-text-dark dark:text-white mb-2">
              No reports yet
            </h2>
            <p className="text-text-gray dark:text-gray-400 mb-6">
              Generate your first wellness report to get AI-powered insights
            </p>
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Generate Your First Report
                </>
              )}
            </button>
          </motion.div>
        ) : (
          /* Reports Grid */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {reports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="card group"
                >
                  {/* Report Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-peach via-accent-lavender to-accent-sage flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>

                  {/* Report Title */}
                  <h3 className="text-lg font-heading font-bold text-text-dark dark:text-white mb-2">
                    {report.reportType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>

                  {/* Report Date */}
                  <div className="flex items-center gap-2 text-sm text-text-gray dark:text-gray-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{dayjs(report.createdAt).format('MMM D, YYYY')}</span>
                  </div>

                  {/* Report Summary (truncated) */}
                  {report.summary && (
                    <p className="text-sm text-text-gray dark:text-gray-400 mb-4 line-clamp-3">
                      {report.summary}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleDownload(report.id, report.reportType)}
                      disabled={downloadingId === report.id}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent-sage hover:bg-opacity-90 text-text-dark rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Download ${report.reportType} report`}
                    >
                      {downloadingId === report.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Download</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(report.id)}
                      disabled={deletingId === report.id}
                      className="px-3 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:bg-opacity-20 dark:hover:bg-opacity-30 text-red-600 dark:text-red-400 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Delete ${report.reportType} report`}
                    >
                      {deletingId === report.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-accent-peach bg-opacity-20 rounded-card"
        >
          <h3 className="font-heading font-bold text-text-dark dark:text-white mb-2">
            About Your Reports
          </h3>
          <ul className="space-y-2 text-sm text-text-gray dark:text-gray-400">
            <li>• Reports are generated using AI analysis of your mood tracking and journal entries</li>
            <li>• Each report includes personalized insights and recommendations</li>
            <li>• Reports are available as downloadable PDFs</li>
            <li>• Your data is private and never shared with third parties</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
