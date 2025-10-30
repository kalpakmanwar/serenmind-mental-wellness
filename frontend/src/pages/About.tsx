import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, Shield, Sparkles, Mail, Phone } from 'lucide-react';

// =========================================
// About Page
// =========================================

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - SerenMind by Kalpak Manwar</title>
        <meta name="description" content="Learn about SerenMind, a mental wellness application developed by Kalpak Manwar to help people track their mental health journey." />
      </Helmet>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-dark dark:text-white mb-4">
              About SerenMind
            </h1>
            <p className="text-xl text-text-gray dark:text-gray-400">
              Your Mental Wellness Companion 🌟
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-peach flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-text-dark" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-dark dark:text-white mb-3">
                  Our Mission
                </h2>
                <p className="text-text-gray dark:text-gray-400 leading-relaxed">
                  SerenMind is dedicated to making mental wellness accessible to everyone. We believe that 
                  tracking your emotional journey, reflecting through journaling, and receiving personalized 
                  insights can significantly improve mental well-being.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-sage flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-text-dark" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-dark dark:text-white mb-3">
                  What We Offer
                </h2>
                <ul className="space-y-2 text-text-gray dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-peach mt-1">•</span>
                    <span><strong>Mood Tracking:</strong> Log your daily emotions with easy-to-use emoji-based tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-peach mt-1">•</span>
                    <span><strong>Journal Entries:</strong> Reflect on your thoughts and experiences in a private, secure space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-peach mt-1">•</span>
                    <span><strong>AI-Powered Insights:</strong> Get personalized recommendations based on your mental wellness patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-peach mt-1">•</span>
                    <span><strong>Wellness Reports:</strong> Generate comprehensive reports to share with your therapist or for personal review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-peach mt-1">•</span>
                    <span><strong>Trend Analysis:</strong> Visualize your emotional journey with beautiful, interactive charts</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-lavender flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-text-dark" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-dark dark:text-white mb-3">
                  Your Privacy Matters
                </h2>
                <p className="text-text-gray dark:text-gray-400 leading-relaxed">
                  We take your privacy seriously. All your data is encrypted, securely stored, and never shared 
                  with third parties. You have full control over your information with the ability to export or 
                  delete your data at any time. SerenMind is GDPR compliant and follows best practices for 
                  data protection.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Developer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card bg-gradient-to-br from-accent-peach/20 via-accent-lavender/20 to-accent-sage/20"
          >
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold text-text-dark dark:text-white mb-3">
                About the Developer
              </h2>
              <p className="text-text-gray dark:text-gray-400 leading-relaxed mb-6">
                SerenMind was developed by <strong className="text-text-dark dark:text-white">Kalpak Manwar</strong> as 
                part of a mental wellness initiative. This project combines cutting-edge technology with a passion 
                for mental health awareness to create a tool that can genuinely help people improve their emotional 
                well-being.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a 
                  href="mailto:kalpakmanwar@gmail.com"
                  className="flex items-center gap-2 text-text-dark dark:text-white hover:text-accent-peach transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>kalpakmanwar@gmail.com</span>
                </a>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
                <a 
                  href="tel:+918767309198"
                  className="flex items-center gap-2 text-text-dark dark:text-white hover:text-accent-peach transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91-8767309198</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <h3 className="text-2xl font-heading font-bold text-text-dark dark:text-white mb-4">
              Ready to Start Your Wellness Journey?
            </h3>
            <a
              href="/register"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Get Started for Free
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;

