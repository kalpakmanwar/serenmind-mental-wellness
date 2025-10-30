import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, LogOut, User, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks';

// =========================================
// Header Component
// =========================================

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const navLinks = isAuthenticated
    ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/journal', label: 'Journal' },
        { to: '/chat', label: 'AI Chat' },
        { to: '/reports', label: 'Reports' },
        { to: '/goals', label: '🎯 Goals' },
        { to: '/resources', label: '🌟 Resources' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/resources', label: '🌟 Resources' },
        { to: '/login', label: 'Login' },
      ];

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center space-x-2 group"
            aria-label="SerenMind Home"
          >
            <span className="text-2xl" aria-hidden="true">
              🌟
            </span>
            <span className="text-xl font-heading font-bold text-text-dark dark:text-white group-hover:text-accent-peach transition-colors">
              SerenMind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'bg-accent-peach text-text-dark'
                    : 'text-text-gray hover:bg-accent-peach/20 hover:text-text-dark dark:text-gray-300 dark:hover:bg-accent-peach/20'
                }`}
                aria-current={location.pathname === link.to ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Crisis Button */}
            <Link
              to="/crisis"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              aria-label="Crisis Support"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Need Help?</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-text-gray hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="p-2 rounded-xl text-text-gray hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                  aria-label="View profile"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-accent-sage text-text-dark hover:bg-opacity-90 transition-all duration-200"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-accent-peach text-text-dark hover:bg-opacity-90 transition-all duration-200 font-medium"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-text-gray hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'bg-accent-peach text-text-dark'
                      : 'text-text-gray hover:bg-accent-peach/20 hover:text-text-dark dark:text-gray-300'
                  }`}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}

              {/* Crisis Button (Mobile) */}
              <Link
                to="/crisis"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-200 font-semibold shadow-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Need Help? (Crisis Support)</span>
              </Link>

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-text-gray dark:text-gray-400">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl text-text-gray hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                  aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 rounded-xl text-text-gray hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-accent-sage text-text-dark hover:bg-opacity-90 transition-all duration-200 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

