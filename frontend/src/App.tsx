/**
 * SerenMind - Mental Wellness Application
 * Main Application Component
 * 
 * DEVELOPER: Kalpak Shrikrushna Manwar
 * EMAIL: kalpakm11@gmail.com  
 * PHONE: +91-8767309198
 * 
 * This is the root React component that sets up routing, authentication,
 * and global providers for the entire application.
 * 
 * Technologies: React 18, TypeScript, React Router v6, Tailwind CSS,
 *               Framer Motion, Chart.js, Axios, Web Speech API
 * 
 * @author Kalpak Shrikrushna Manwar
 * @version 1.0.0
 * @since October 2025
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/context/AuthContext';
import { Header, Footer, ProtectedRoute } from '@/components/layout';

// Pages (lazy-loaded for code splitting)
import { lazy, Suspense, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { notificationService } from '@/services/notificationService';

const Landing = lazy(() => import('@/pages/Landing'));
const LoginRegister = lazy(() => import('@/pages/LoginRegister'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Journal = lazy(() => import('@/pages/Journal'));
const Chat = lazy(() => import('@/pages/Chat'));
const Reports = lazy(() => import('@/pages/Reports'));
const Profile = lazy(() => import('@/pages/Profile'));
const About = lazy(() => import('@/pages/About'));
const Resources = lazy(() => import('@/pages/Resources'));
const Crisis = lazy(() => import('@/pages/Crisis'));
const Goals = lazy(() => import('@/pages/Goals'));

// Feature Pages
const MoodTracking = lazy(() => import('@/pages/features/MoodTracking'));
const AiInsights = lazy(() => import('@/pages/features/AiInsights'));
const Analytics = lazy(() => import('@/pages/features/Analytics'));
const Security = lazy(() => import('@/pages/features/Security'));
const Journaling = lazy(() => import('@/pages/features/Journaling'));
const ReportsFeature = lazy(() => import('@/pages/features/Reports'));

// =========================================
// Loading Component
// =========================================

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-primary-bg dark:bg-gray-900">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-accent-peach mx-auto mb-4" />
      <p className="text-text-gray dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

// =========================================
// App Component
// =========================================

function App() {
  // Initialize notifications on app startup
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[App] Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('[App] Service Worker registration failed:', error);
        });
    }

    // Initialize notification service
    notificationService.initialize();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-primary-bg dark:bg-gray-900 transition-colors duration-300">
            <Header />
          
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/crisis" element={<Crisis />} />
          
          {/* Feature Pages */}
          <Route path="/features/mood-tracking" element={<MoodTracking />} />
          <Route path="/features/ai-insights" element={<AiInsights />} />
          <Route path="/features/analytics" element={<Analytics />} />
          <Route path="/features/security" element={<Security />} />
          <Route path="/features/journaling" element={<Journaling />} />
          <Route path="/features/reports" element={<ReportsFeature />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/journal"
                  element={
                    <ProtectedRoute>
                      <Journal />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/goals"
                  element={
                    <ProtectedRoute>
                      <Goals />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1E293B',
              borderRadius: '1rem',
              padding: '1rem',
              boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;

