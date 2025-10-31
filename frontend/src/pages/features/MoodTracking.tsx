import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Heart, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Clock, 
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Award
} from "lucide-react";

const MoodTracking = () => {
  const features = [
    {
      icon: Heart,
      title: "Daily Mood Check-ins",
      description: "Track your emotional state every day with intuitive mood ratings (1-10 scale)"
    },
    {
      icon: TrendingUp,
      title: "Energy & Stress Levels",
      description: "Monitor energy and stress levels alongside mood for complete wellness picture"
    },
    {
      icon: Calendar,
      title: "Historical Data",
      description: "Access your complete mood history with beautiful calendar views"
    },
    {
      icon: BarChart3,
      title: "Visual Trends",
      description: "See your emotional patterns with interactive charts and graphs"
    },
    {
      icon: Clock,
      title: "Time-based Analysis",
      description: "Understand how your mood changes over days, weeks, and months"
    },
    {
      icon: Target,
      title: "Pattern Recognition",
      description: "Identify triggers and patterns that affect your mental wellness"
    }
  ];

  const benefits = [
    "🎯 Increased self-awareness and emotional intelligence",
    "📊 Data-driven insights into your mental health patterns",
    "🔍 Early detection of concerning mood trends",
    "💪 Empowerment through understanding your emotions",
    "📈 Track progress and celebrate improvements",
    "🧠 Better communication with therapists/counselors"
  ];

  const useCases = [
    {
      title: "For Students",
      description: "Track exam stress, identify study-life balance, monitor academic pressure impact",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "For Professionals",
      description: "Monitor work-related stress, prevent burnout, optimize work-life harmony",
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "For Personal Growth",
      description: "Build self-awareness, track habit changes, measure wellness interventions",
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "For Therapy Support",
      description: "Provide therapists with detailed mood data, track treatment effectiveness",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Feature Spotlight
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mood Tracking
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Track your emotions daily with beautiful visualizations and insights. 
              Understand your patterns, identify triggers, and improve your mental wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Tracking Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-purple-200"
                >
                  View Live Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Feature Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", text: "Rate your mood daily (1-10 scale)" },
                    { step: "2", text: "Track energy and stress levels" },
                    { step: "3", text: "Add optional notes about your day" },
                    { step: "4", text: "View beautiful trend charts" },
                    { step: "5", text: "Get AI-powered insights" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-20 h-20 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">Interactive Mood Tracker</p>
                  <p className="text-sm text-gray-500 mt-2">Beautiful charts & insights</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to understand your emotional wellbeing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Perfect For Everyone
            </h2>
            <p className="text-xl text-gray-600">
              No matter who you are, mood tracking can help
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border border-purple-100"
              >
                <div className={`h-2 w-20 bg-gradient-to-r ${useCase.color} rounded-full mb-4`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Proven Benefits
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Why Track Your Mood?
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Scientific research shows that regular mood tracking leads to better mental health outcomes and increased self-awareness.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl"
            >
              <Zap className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Start Your Journey Today</h3>
              <p className="text-xl mb-6 text-purple-100">
                Join thousands of users who have improved their mental wellness through consistent mood tracking.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Free Forever</p>
                    <p className="text-sm text-purple-100">No credit card required</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Takes 2 Minutes Daily</p>
                    <p className="text-sm text-purple-100">Quick and easy</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Private & Secure</p>
                    <p className="text-sm text-purple-100">Your data stays yours</p>
                  </div>
                </div>
              </div>

              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-purple-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Understand Your Emotions?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Start tracking your mood today and discover patterns you never knew existed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Create Free Account
                </motion.button>
              </Link>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-purple-700/50 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
                >
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MoodTracking;

