import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Save, 
  Search, 
  Star, 
  Calendar, 
  Edit3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Heart,
  Award,
  Clock
} from "lucide-react";

const Journaling = () => {
  const features = [
    {
      icon: Save,
      title: "Auto-Save",
      description: "Never lose your thoughts - every keystroke is automatically saved"
    },
    {
      icon: Edit3,
      title: "Rich Formatting",
      description: "Express yourself with formatting, emojis, and beautiful typography"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find any entry instantly with powerful full-text search"
    },
    {
      icon: Star,
      title: "Favorites",
      description: "Mark important entries as favorites for quick access"
    },
    {
      icon: Calendar,
      title: "Date Filtering",
      description: "Browse entries by date or find specific moments in your journey"
    },
    {
      icon: Heart,
      title: "Mood Integration",
      description: "Link journal entries to your mood data for deeper insights"
    }
  ];

  const benefits = [
    "📝 Improved mental clarity and self-awareness",
    "🧠 Better emotional processing and regulation",
    "💡 Enhanced problem-solving abilities",
    "😌 Reduced stress and anxiety levels",
    "🎯 Clearer goals and life direction",
    "📊 Track personal growth over time"
  ];

  const useCases = [
    {
      title: "Daily Reflection",
      description: "End each day by writing about your experiences, thoughts, and feelings.",
      emoji: "🌙",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Gratitude Practice",
      description: "List things you're grateful for to boost positivity and wellbeing.",
      emoji: "🙏",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Emotional Processing",
      description: "Work through difficult feelings by putting them into words.",
      emoji: "💭",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Goal Setting",
      description: "Write down your goals and track progress towards achieving them.",
      emoji: "🎯",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Creative Expression",
      description: "Use journaling as a creative outlet for stories, poems, and ideas.",
      emoji: "✨",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Problem Solving",
      description: "Write about challenges to gain new perspectives and solutions.",
      emoji: "💡",
      color: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-yellow-600/10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Express Yourself
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Instant Journaling
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Express yourself freely with auto-save journaling and rich formatting. 
              Your thoughts are precious - capture them effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Journaling Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-amber-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-amber-200"
                >
                  See Journal Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Journal Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-amber-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Today's Journal Entry</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Auto-saved 2 seconds ago
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
              <h4 className="text-xl font-bold text-gray-800 mb-3">Reflecting on Today's Achievements</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Today was a productive day! I managed to complete my project deadline and even had time 
                for a walk in the park. Feeling grateful for small moments of peace. 🌳
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                I noticed my stress levels were lower when I took regular breaks. This is something 
                I should continue doing. Maybe meditation during lunch could help even more?
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-amber-200">
                <button className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-sm font-semibold">Favorited</span>
                </button>
                <span className="text-sm text-gray-500">· 247 words</span>
                <span className="text-sm text-gray-500">· 2 min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Journaling Made Easy
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to capture your thoughts effortlessly
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
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
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
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Ways to Journal
            </h2>
            <p className="text-xl text-gray-600">
              There's no wrong way to journal - find what works for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-amber-100"
              >
                <div className={`text-5xl mb-4`}>{useCase.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
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
                Science-Backed Benefits
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Why Journaling Works
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Research shows that regular journaling significantly improves mental health, 
                reduces stress, and enhances emotional wellbeing.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-amber-50 rounded-lg p-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-600 to-yellow-600 rounded-2xl p-8 text-white shadow-2xl"
            >
              <BookOpen className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Start Your Journal Today</h3>
              <p className="text-xl mb-6 text-amber-100">
                Join thousands who have transformed their mental health through the simple act of writing.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">5 Minutes Daily</p>
                  <p className="text-amber-100">That's all it takes to see benefits</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">100% Private</p>
                  <p className="text-amber-100">Your thoughts stay yours</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">Auto-Saved</p>
                  <p className="text-amber-100">Never lose your entries</p>
                </div>
              </div>

              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-amber-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Create Your Journal
                  <Edit3 className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Story Matters
            </h2>
            <p className="text-xl mb-8 text-amber-100">
              Begin your journaling journey today and discover the power of self-expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-amber-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Writing Free
                </motion.button>
              </Link>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-amber-700/50 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
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

export default Journaling;

