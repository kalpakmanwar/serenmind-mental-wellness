import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  TrendingUp, 
  FileText, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bot,
  Award,
  Volume2
} from "lucide-react";

const AiInsights = () => {
  const features = [
    {
      icon: Bot,
      title: "24/7 AI Companion",
      description: "Chat with an empathetic AI therapist anytime, anywhere - no appointments needed"
    },
    {
      icon: Volume2,
      title: "Voice Output",
      description: "AI speaks back to you! Listen to responses with natural text-to-speech"
    },
    {
      icon: Brain,
      title: "Personalized Analysis",
      description: "Get insights tailored to your unique mood patterns and wellness journey"
    },
    {
      icon: Lightbulb,
      title: "Smart Recommendations",
      description: "Receive actionable advice based on your mood data and conversations"
    },
    {
      icon: FileText,
      title: "Monthly Reports",
      description: "AI generates comprehensive wellness reports with insights and trends"
    },
    {
      icon: TrendingUp,
      title: "Pattern Recognition",
      description: "AI identifies triggers, patterns, and correlations in your mental health data"
    }
  ];

  const chatExamples = [
    {
      user: "I'm feeling really anxious about my upcoming exam",
      ai: "I understand exam anxiety can be overwhelming. Let's work through this together. Have you tried breaking your study material into smaller, manageable chunks? Also, practicing deep breathing can help calm your nervous system.",
      suggestions: ["Try 5-minute study breaks", "Practice breathing exercises", "Review your study schedule"]
    },
    {
      user: "I can't seem to sleep well lately",
      ai: "Sleep issues are common and can significantly impact your wellbeing. Looking at your mood data, I notice your stress levels have been elevated in the evenings. Let's create a calming bedtime routine.",
      suggestions: ["Limit screen time before bed", "Try progressive muscle relaxation", "Keep a consistent sleep schedule"]
    },
    {
      user: "I feel like I'm not making any progress",
      ai: "Actually, your mood data shows a 23% improvement in overall mood score over the past month! Sometimes progress feels slow when we're in it, but the data shows you're doing better than you think.",
      suggestions: ["Review your progress charts", "Celebrate small wins", "Download your wellness report"]
    }
  ];

  const benefits = [
    "💬 Instant support without waiting for appointments",
    "🧠 Non-judgmental, empathetic conversations",
    "📊 Data-driven insights from your mood history",
    "🎯 Personalized coping strategies and suggestions",
    "🔒 100% private - your conversations stay confidential",
    "🌙 Available 24/7, even at 3 AM when you can't sleep"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Technology
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              AI-Powered Insights
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized recommendations and analysis from our intelligent AI. 
              24/7 support, voice conversations, and data-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Try AI Chat Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-blue-200"
                >
                  See Live Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* AI Chat Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">AI Wellness Companion</h3>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  Online 24/7
                </p>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 rounded-xl p-6">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                  <p>I'm feeling really stressed about work today</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                  <p className="text-gray-800">I hear you, and that's completely valid. Work stress is something many people experience. Looking at your recent mood entries, I notice your stress levels have been elevated for the past few days. Let's explore some strategies to help you feel better. 💙</p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 font-semibold mb-2">Try these:</p>
                    <div className="space-y-2">
                      {["Take a 5-minute breathing break", "Write down your top 3 priorities", "Step away for a short walk"].map((tip, i) => (
                        <div key={i} className="text-sm text-blue-600 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-blue-600">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-semibold">AI is speaking...</span>
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
              Advanced AI Capabilities
            </h2>
            <p className="text-xl text-gray-600">
              More than just a chatbot - a true wellness companion
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
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
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

      {/* Chat Examples */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Real Conversations
            </h2>
            <p className="text-xl text-gray-600">
              See how our AI provides empathetic, personalized support
            </p>
          </motion.div>

          <div className="space-y-8">
            {chatExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-blue-100"
              >
                <div className="flex justify-end mb-4">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                    <p>{example.user}</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-2xl">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-gray-800">{example.ai}</p>
                    </div>
                    <div className="ml-11 pt-3 border-t border-blue-100">
                      <p className="text-sm font-semibold text-gray-700 mb-2">💡 Suggestions:</p>
                      <div className="space-y-2">
                        {example.suggestions.map((suggestion, i) => (
                          <div key={i} className="text-sm text-blue-600 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl"
            >
              <Brain className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Always There When You Need It</h3>
              <p className="text-xl mb-6 text-blue-100">
                Unlike traditional therapy, our AI is available 24/7 with instant responses and unlimited conversations.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">Free Forever</p>
                  <p className="text-blue-100">No session limits or hidden fees</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">Instant Responses</p>
                  <p className="text-blue-100">No waiting rooms or appointments</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">100% Private</p>
                  <p className="text-blue-100">Your conversations are confidential</p>
                </div>
              </div>

              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Start Chatting Now
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Key Advantages
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Why Our AI is Different
              </h2>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-blue-50 rounded-lg p-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience AI Therapy Today
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands who are improving their mental wellness with AI support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Free Chat
                </motion.button>
              </Link>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-700/50 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
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

export default AiInsights;

