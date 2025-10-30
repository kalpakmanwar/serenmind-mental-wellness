import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Brain, TrendingUp, Shield, Zap } from 'lucide-react';
import { BlobPeach, BlobSage, BlobLavender } from '@/assets/svg';
import { useAuth } from '@/context/AuthContext';

// =========================================
// Landing Page
// =========================================

const Landing = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Track your emotions daily with beautiful visualizations and insights.',
      color: 'text-red-500',
      link: '/features/mood-tracking',
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations and analysis from our intelligent AI.',
      color: 'text-purple-500',
      link: '/features/ai-insights',
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Visualize your mental wellness journey with detailed charts and reports.',
      color: 'text-blue-500',
      link: '/features/analytics',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your data is encrypted and never shared. Your privacy is our priority.',
      color: 'text-green-500',
      link: '/features/security',
    },
    {
      icon: Zap,
      title: 'Instant Journaling',
      description: 'Express yourself freely with auto-save journaling and rich formatting.',
      color: 'text-yellow-500',
      link: '/features/journaling',
    },
    {
      icon: Sparkles,
      title: 'Personalized Reports',
      description: 'Download beautiful PDF reports to track your progress over time.',
      color: 'text-blue-500',
      link: '/features/reports',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Blobs */}
      <BlobPeach className="absolute top-0 right-0 w-96 h-96 opacity-30 animate-blob" />
      <BlobSage className="absolute bottom-0 left-0 w-96 h-96 opacity-30 animate-blob animation-delay-2000" />
      <BlobLavender className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20 animate-blob animation-delay-4000" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-heading font-bold text-text-dark dark:text-white mb-6"
          >
            Your Mental Wellness
            <br />
            <span className="gradient-text">Companion 🌟</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-gray dark:text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Track your moods, journal your thoughts, and get AI-powered insights to support your
            mental health journey with compassion and understanding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="btn btn-primary text-lg px-8 py-4 shadow-soft-lg hover:shadow-glow-peach"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Start Your Journey'}
            </Link>
            <Link
              to="/login"
              className="btn btn-outline text-lg px-8 py-4"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-dark dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-text-gray dark:text-gray-300">
            Powerful tools to support your mental wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.link} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card group cursor-pointer hover:shadow-xl transition-all"
              >
                <div className={`inline-flex p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {feature.title} →
                </h3>
                <p className="text-text-gray dark:text-gray-400">
                  {feature.description}
                </p>
                <p className="text-sm text-primary font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More →
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-br from-accent-peach via-accent-lavender to-accent-sage p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-text-dark mb-8 max-w-2xl mx-auto">
            Join thousands of people taking control of their mental wellness journey
          </p>
          <Link
            to="/register"
            className="inline-block btn bg-white text-text-dark hover:bg-gray-100 text-lg px-8 py-4 shadow-soft-lg"
          >
            Create Free Account
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;

