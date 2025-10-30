import { Link } from 'react-router-dom';
import { Heart, Mail, Phone } from 'lucide-react';

// =========================================
// Footer Component
// =========================================

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl" aria-hidden="true">
                🌟
              </span>
              <span className="text-xl font-heading font-bold text-text-dark dark:text-white">
                SerenMind
              </span>
            </div>
            <p className="text-text-gray dark:text-gray-400 text-sm max-w-md">
              Your mental wellness companion for mood tracking, journaling, and AI-powered insights.
              Take control of your mental health journey with compassion and understanding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-dark dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-text-gray dark:text-gray-400 hover:text-accent-peach dark:hover:text-accent-peach transition-colors text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/journal"
                  className="text-text-gray dark:text-gray-400 hover:text-accent-peach dark:hover:text-accent-peach transition-colors text-sm"
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className="text-text-gray dark:text-gray-400 hover:text-accent-peach dark:hover:text-accent-peach transition-colors text-sm"
                >
                  AI Chat
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-text-gray dark:text-gray-400 hover:text-accent-peach dark:hover:text-accent-peach transition-colors text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-text-dark dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:kalpakmanwar@gmail.com"
                  className="text-text-gray dark:text-gray-400 hover:text-accent-peach dark:hover:text-accent-peach transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  kalpakmanwar@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918767309198"
                  className="text-text-gray dark:text-gray-400 hover:text-accent-peach dark:hover:text-accent-peach transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +91-8767309198
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-text-gray dark:text-gray-400 hover:text-accent-peach dark:hover:text-accent-peach transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-text-gray dark:text-gray-400 hover:text-accent-peach dark:hover:text-accent-peach transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-text-gray dark:text-gray-400">
              © {currentYear} SerenMind. All rights reserved.
            </p>
            <p className="text-sm text-text-gray dark:text-gray-400 flex items-center gap-1">
              Made with{' '}
              <Heart className="w-4 h-4 text-red-500 fill-current" aria-label="love" />{' '}
              by{' '}
              <a 
                href="mailto:kalpakmanwar@gmail.com" 
                className="hover:text-accent-peach transition-colors font-medium"
              >
                Kalpak Manwar
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
