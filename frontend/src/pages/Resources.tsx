import { motion } from 'framer-motion';
import { Heart, Phone, MessageCircle, Brain, Wind, Sparkles, Sun, Moon as MoonIcon, Smile, Shield, Book, Users, AlertCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

// =========================================
// Wellness Resources Page
// Mental Health Support & Therapy Info
// =========================================

const Resources = () => {
  const [activeTab, setActiveTab] = useState<'crisis' | 'therapy' | 'techniques' | 'resources'>('crisis');

  // Crisis Helplines
  const crisisHelplines = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential support',
      country: 'USA',
      icon: Phone
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 crisis support via text',
      country: 'USA',
      icon: MessageCircle
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information',
      country: 'USA',
      icon: Phone
    },
    {
      name: 'VANDREVALA Foundation',
      number: '1860-2662-345',
      description: '24/7 mental health support',
      country: 'India',
      icon: Phone
    },
    {
      name: 'iCall',
      number: '9152987821',
      description: 'Counseling service by TISS',
      country: 'India',
      icon: Phone
    }
  ];

  // Therapy Types
  const therapyTypes = [
    {
      name: 'Cognitive Behavioral Therapy (CBT)',
      description: 'Helps identify and change negative thought patterns',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Anxiety', 'Depression', 'OCD', 'PTSD']
    },
    {
      name: 'Mindfulness-Based Therapy',
      description: 'Focuses on present-moment awareness and acceptance',
      icon: Wind,
      color: 'from-green-500 to-teal-500',
      benefits: ['Stress', 'Anxiety', 'Chronic Pain']
    },
    {
      name: 'Talk Therapy (Psychotherapy)',
      description: 'Explore thoughts and feelings with a trained professional',
      icon: MessageCircle,
      color: 'from-purple-500 to-indigo-500',
      benefits: ['Depression', 'Relationships', 'Life Transitions']
    },
    {
      name: 'Group Therapy',
      description: 'Share experiences and support with others facing similar challenges',
      icon: Users,
      color: 'from-orange-500 to-amber-500',
      benefits: ['Social Support', 'Shared Experiences', 'Community']
    }
  ];

  // Self-Help Techniques
  const techniques = [
    {
      title: '5-4-3-2-1 Grounding',
      description: 'Acknowledge 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste',
      icon: Sparkles,
      color: 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
      steps: [
        'Find a comfortable position',
        'Name 5 things you can see',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste'
      ]
    },
    {
      title: 'Box Breathing',
      description: 'A simple breathing technique to reduce stress and anxiety',
      icon: Wind,
      color: 'bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30',
      steps: [
        'Breathe in for 4 counts',
        'Hold for 4 counts',
        'Breathe out for 4 counts',
        'Hold for 4 counts',
        'Repeat 4-5 times'
      ]
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Reduce physical tension and promote relaxation',
      icon: Heart,
      color: 'bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30',
      steps: [
        'Find a quiet space',
        'Tense muscles for 5 seconds',
        'Release and relax for 10 seconds',
        'Start from feet, move up to head',
        'Notice the difference between tension and relaxation'
      ]
    },
    {
      title: 'Positive Affirmations',
      description: 'Reframe negative thoughts with positive statements',
      icon: Smile,
      color: 'bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30',
      steps: [
        '"I am worthy of love and respect"',
        '"I choose peace and calm"',
        '"I am doing my best, and that\'s enough"',
        '"This feeling is temporary"',
        '"I have the strength to overcome this"'
      ]
    }
  ];

  // Professional Resources
  const professionalResources = [
    {
      name: 'Psychology Today',
      description: 'Find therapists, psychiatrists, and support groups',
      url: 'https://www.psychologytoday.com',
      icon: Book
    },
    {
      name: 'BetterHelp',
      description: 'Online therapy and counseling services',
      url: 'https://www.betterhelp.com',
      icon: MessageCircle
    },
    {
      name: 'NAMI',
      description: 'National Alliance on Mental Illness - Education & Support',
      url: 'https://www.nami.org',
      icon: Users
    },
    {
      name: 'Mental Health America',
      description: 'Screening tools and resources',
      url: 'https://www.mhanational.org',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Wellness Resources 🌟
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            You're not alone. Here are resources, techniques, and professional support to help you on your journey to wellness.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
            { id: 'crisis', label: '🆘 Crisis Support', icon: AlertCircle },
            { id: 'therapy', label: '💬 Therapy Info', icon: Brain },
            { id: 'techniques', label: '🧘 Self-Help', icon: Sparkles },
            { id: 'resources', label: '📚 Resources', icon: Book }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Crisis Support Tab */}
        {activeTab === 'crisis' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                  If you're in crisis, help is available
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you're experiencing a mental health emergency, please reach out immediately. These services are free, confidential, and available 24/7.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {crisisHelplines.map((helpline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
                >
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md"
                      whileHover={{ rotate: 360, boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)' }}
                      transition={{ duration: 0.5 }}
                    >
                      <helpline.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{helpline.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{helpline.country}</span>
                    </div>
                  </motion.div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-3">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{helpline.number}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{helpline.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Therapy Info Tab */}
        {activeTab === 'therapy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Types of Therapy 💬
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Different types of therapy work for different people. Here are some common approaches that mental health professionals use to help.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {therapyTypes.map((therapy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer"
                >
                  <div className={`w-full h-2 bg-gradient-to-r ${therapy.color} rounded-t-2xl mb-4`} />
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${therapy.color} flex items-center justify-center shadow-md`}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <therapy.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">{therapy.name}</h3>
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{therapy.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {therapy.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Self-Help Techniques Tab */}
        {activeTab === 'techniques' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Self-Help Techniques 🧘
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                These evidence-based techniques can help you manage stress, anxiety, and difficult emotions. Practice them regularly for best results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {techniques.map((technique, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgb(59, 130, 246)',
                    transition: { duration: 0.3 }
                  }}
                  className={`${technique.color} rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 transition-all duration-300 cursor-pointer`}
                >
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md"
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: [0, -10, 10, 0],
                        boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <technique.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white">{technique.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{technique.description}</p>
                    </div>
                  </motion.div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-inner">
                    <ul className="space-y-2">
                      {technique.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="font-bold text-blue-600 dark:text-blue-400">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Professional Resources Tab */}
        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Professional Resources 📚
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Find professional help, support groups, and educational resources to support your mental health journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {professionalResources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-blue-200 dark:border-blue-700 hover:shadow-xl hover:scale-105 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md"
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 360,
                        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <resource.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{resource.name}</h3>
                        <motion.div
                          whileHover={{ x: 5, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{resource.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Motivational Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 30px 60px rgba(59, 130, 246, 0.3)'
          }}
          className="mt-12 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl p-8 shadow-2xl text-center cursor-pointer"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
          </motion.div>
          <blockquote className="text-2xl font-bold text-white mb-4">
            "Healing is not linear. Every step forward, no matter how small, is progress."
          </blockquote>
          <p className="text-blue-100">
            Remember: It's okay to not be okay. Seeking help is a sign of strength, not weakness.
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            💙 Made with care by <strong>Kalpak Manwar</strong> • SerenMind is here to support your wellness journey
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This page provides general information and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;

