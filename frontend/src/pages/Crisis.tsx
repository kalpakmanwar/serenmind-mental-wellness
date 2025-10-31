import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Heart, Phone, Wind, Hand, Eye, Ear, Brain, Shield } from 'lucide-react';

const Crisis = () => {
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);

  // Breathing animation cycle: 4s inhale, 4s hold, 6s exhale (4-4-6 technique)
  useEffect(() => {
    if (!showBreathing) return;

    const cycle = async () => {
      // Inhale
      setBreathingPhase('inhale');
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Hold
      setBreathingPhase('hold');
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Exhale
      setBreathingPhase('exhale');
      await new Promise(resolve => setTimeout(resolve, 6000));
      
      setBreathCount(prev => prev + 1);
    };

    const interval = setInterval(cycle, 14000);
    cycle(); // Start immediately

    return () => clearInterval(interval);
  }, [showBreathing]);

  const crisisHotlines = [
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
      description: 'Free, 24/7 crisis support via text',
      country: 'USA',
      icon: Phone
    },
    {
      name: 'International Association for Suicide Prevention',
      number: 'iasp.info/resources',
      description: 'Find help in your country',
      country: 'Global',
      icon: Phone
    }
  ];

  const groundingTechniques = [
    {
      title: '5-4-3-2-1 Grounding',
      icon: Eye,
      steps: [
        '5 things you can SEE',
        '4 things you can TOUCH',
        '3 things you can HEAR',
        '2 things you can SMELL',
        '1 thing you can TASTE'
      ]
    },
    {
      title: 'Ice Cube Technique',
      icon: Hand,
      steps: [
        'Hold an ice cube in your hand',
        'Focus on the sensation',
        'Notice the cold, the melting',
        'Feel yourself coming back to the present'
      ]
    },
    {
      title: 'Butterfly Hug',
      icon: Heart,
      steps: [
        'Cross your arms over your chest',
        'Place hands on opposite shoulders',
        'Tap gently, alternating hands',
        'Breathe slowly while tapping'
      ]
    }
  ];

  const getBreathingText = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 'Breathe In...';
      case 'hold':
        return 'Hold...';
      case 'exhale':
        return 'Breathe Out...';
    }
  };

  const getBreathingDuration = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 4;
      case 'hold':
        return 4;
      case 'exhale':
        return 6;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-4"
          >
            <Shield className="w-16 h-16 text-red-500 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            You're Not Alone
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Immediate support and coping techniques
          </p>
        </motion.div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 dark:text-red-300 text-lg mb-2">
                If you're in immediate danger or having thoughts of self-harm:
              </h3>
              <ul className="space-y-2 text-red-800 dark:text-red-200">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Call 988 (Suicide & Crisis Lifeline) - Available 24/7
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Text HOME to 741741 (Crisis Text Line)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Call 911 or go to your nearest emergency room
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Main Panic Button */}
        {!showBreathing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBreathing(true)}
              className="w-full max-w-md mx-auto block bg-gradient-to-br from-red-500 via-orange-500 to-red-600 text-white rounded-3xl p-12 shadow-2xl hover:shadow-red-500/50 transition-all"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Wind className="w-24 h-24 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">I Need Help Now</h2>
              <p className="text-xl opacity-90">Click to start guided breathing</p>
            </motion.button>
          </motion.div>
        ) : (
          // Breathing Exercise
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Breathing Exercise
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Follow the circle and breathe • Cycle {breathCount + 1}
                </p>
              </div>

              {/* Animated Breathing Circle */}
              <div className="flex items-center justify-center mb-8" style={{ height: '400px' }}>
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: breathingPhase === 'inhale' ? 2 : breathingPhase === 'hold' ? 2 : 1,
                      opacity: breathingPhase === 'exhale' ? 0.4 : 1
                    }}
                    transition={{ duration: getBreathingDuration(), ease: 'easeInOut' }}
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 shadow-2xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: 360
                    }}
                    transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-4 border-white/30"
                  />
                </div>
              </div>

              <motion.div
                key={breathingPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {getBreathingText()}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {getBreathingDuration()} seconds
                </p>
              </motion.div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setShowBreathing(false);
                    setBreathCount(0);
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Stop Exercise
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Crisis Hotlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6 text-red-500" />
            Crisis Hotlines
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {crisisHotlines.map((hotline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-red-200 dark:border-red-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <hotline.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{hotline.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{hotline.country}</span>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 mb-3">
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">{hotline.number}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{hotline.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grounding Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-500" />
            Grounding Techniques
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {groundingTechniques.map((technique, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <technique.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">{technique.title}</h3>
                </div>
                <ul className="space-y-2">
                  {technique.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Affirmations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Remember:</h3>
          <div className="space-y-3 text-lg text-white">
            <p>💙 This feeling is temporary</p>
            <p>💙 You have survived 100% of your worst days</p>
            <p>💙 Asking for help is a sign of strength</p>
            <p>💙 You matter, and people care about you</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Crisis;

