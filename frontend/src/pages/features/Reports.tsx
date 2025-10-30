import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Brain, 
  Share2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  BarChart3,
  FileCheck
} from "lucide-react";

const Reports = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Generated Insights",
      description: "Comprehensive analysis of your mood patterns and wellness trends"
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis",
      description: "Beautiful charts showing your progress over time"
    },
    {
      icon: Calendar,
      title: "Time-based Reports",
      description: "Generate weekly, monthly, or custom date range reports"
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "Download professional PDF reports to share with your therapist"
    },
    {
      icon: FileCheck,
      title: "Detailed Data",
      description: "Includes mood entries, journal excerpts, and AI chat summaries"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share reports securely with healthcare professionals"
    }
  ];

  const reportContents = [
    {
      title: "Wellness Summary",
      description: "Overall mental health status and key metrics",
      items: ["Average mood score", "Energy levels", "Stress trends", "Entry frequency"]
    },
    {
      title: "Mood Analysis",
      description: "Detailed breakdown of your emotional patterns",
      items: ["Last 3 mood entries", "Highest/lowest days", "Pattern recognition", "Trigger identification"]
    },
    {
      title: "Journal Highlights",
      description: "Key moments from your journaling",
      items: ["Last 3 journal entries", "Favorite entries", "Writing frequency", "Common themes"]
    },
    {
      title: "AI Insights",
      description: "Personalized recommendations and observations",
      items: ["AI chat summary", "Coping strategies", "Progress notes", "Recommendations"]
    }
  ];

  const useCases = [
    {
      title: "Share with Therapist",
      description: "Provide your therapist with detailed data for more effective treatment",
      icon: FileText,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Track Progress",
      description: "See how far you've come and celebrate your improvements",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Insurance Documentation",
      description: "Provide documentation for mental health insurance claims",
      icon: FileCheck,
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "Personal Record",
      description: "Keep a comprehensive record of your wellness journey",
      icon: Award,
      color: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    "📊 Professional-looking PDF reports",
    "🧠 AI-powered insights and recommendations",
    "📈 Visual charts and trend analysis",
    "📝 Detailed mood and journal data",
    "🔒 Secure and encrypted",
    "💾 Download and save locally",
    "🎯 Track goal progress",
    "📅 Custom date ranges"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Professional Reports
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Personalized Reports
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Download beautiful PDF reports to track your progress over time. 
              Professional insights perfect for sharing with your therapist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Generate Your Report
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-blue-200"
                >
                  View Sample Report
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Report Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Monthly Wellness Report</h3>
                  <p className="text-sm text-gray-500">October 2025</p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Wellness Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average Mood</p>
                    <p className="text-2xl font-bold text-blue-600">7.8/10</p>
                    <p className="text-xs text-green-600 font-semibold">↑ 15%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Entries</p>
                    <p className="text-2xl font-bold text-blue-600">28</p>
                    <p className="text-xs text-gray-500">93% consistency</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Energy</p>
                    <p className="text-2xl font-bold text-blue-600">8.2/10</p>
                    <p className="text-xs text-green-600 font-semibold">↑ 23%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Stress</p>
                    <p className="text-2xl font-bold text-blue-600">4.5/10</p>
                    <p className="text-xs text-green-600 font-semibold">↓ 18%</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">AI Insights</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Your mood shows consistent improvement, especially on weekends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Journaling frequency correlates with better mood scores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Stress levels decrease after exercise and social activities</span>
                  </li>
                </ul>
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
              Comprehensive Reports
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to understand your wellness journey
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
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
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

      {/* Report Contents */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              What's Included
            </h2>
            <p className="text-xl text-gray-600">
              Detailed sections covering every aspect of your wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {reportContents.map((content, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border border-blue-100"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {content.title}
                </h3>
                <p className="text-gray-600 mb-4">{content.description}</p>
                <ul className="space-y-2">
                  {content.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Perfect For
            </h2>
            <p className="text-xl text-gray-600">
              Many ways to use your wellness reports
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden bg-white rounded-xl p-8 shadow-lg border border-blue-100"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${useCase.color} opacity-10 rounded-bl-full`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${useCase.color} rounded-lg flex items-center justify-center mb-4`}>
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Report Benefits
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Why Generate Reports?
              </h2>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl"
            >
              <BarChart3 className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Generate Your First Report</h3>
              <p className="text-xl mb-6 text-blue-100">
                Create a comprehensive wellness report in seconds and see your progress visualized.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">Instant Generation</p>
                  <p className="text-blue-100">AI creates reports in under 10 seconds</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">Professional Format</p>
                  <p className="text-blue-100">Beautiful PDF ready to share</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">Unlimited Reports</p>
                  <p className="text-blue-100">Generate as many as you need</p>
                </div>
              </div>

              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Create Report Now
                  <FileText className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FileText className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Track Your Wellness Journey
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Generate professional reports that help you and your therapist understand your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Free
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

export default Reports;

