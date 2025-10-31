import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Calendar, 
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Award,
  Activity
} from "lucide-react";

const Analytics = () => {
  const features = [
    {
      icon: LineChart,
      title: "Trend Charts",
      description: "Beautiful line charts showing your mood, energy, and stress levels over time"
    },
    {
      icon: Calendar,
      title: "30-Day Overview",
      description: "See your complete wellness journey over the past month at a glance"
    },
    {
      icon: Activity,
      title: "Real-time Updates",
      description: "Charts update instantly as you log new mood entries"
    },
    {
      icon: Target,
      title: "Pattern Detection",
      description: "Automatically identify recurring patterns and cycles in your data"
    },
    {
      icon: PieChart,
      title: "Breakdown Analysis",
      description: "Understand the distribution of your moods and stress levels"
    },
    {
      icon: Eye,
      title: "Visual Insights",
      description: "Easy-to-understand visualizations that make sense of complex data"
    }
  ];

  const insights = [
    {
      title: "Spot Trends Early",
      description: "Notice if your mood is declining before it becomes a crisis",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Identify Triggers",
      description: "See what days or events correlate with stress or low mood",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Track Progress",
      description: "Celebrate improvements and validate that your efforts are working",
      icon: Award,
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "Data-Driven Decisions",
      description: "Make informed choices about your mental health based on real data",
      icon: BarChart3,
      color: "from-orange-500 to-red-500"
    }
  ];

  const chartTypes = [
    {
      name: "Mood Trends",
      description: "Track your overall mood score (1-10) over 30 days",
      color: "orange",
      example: "Average mood: 6.8 → 7.5 (↑10%)"
    },
    {
      name: "Energy Levels",
      description: "Monitor your daily energy fluctuations",
      color: "green",
      example: "Energy improving on weekends"
    },
    {
      name: "Stress Tracking",
      description: "See when stress peaks and identify causes",
      color: "purple",
      example: "Stress highest on Mondays"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Data Visualization
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
              Progress Analytics
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Visualize your mental wellness journey with detailed charts and reports. 
              Turn your mood data into actionable insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  See Your Analytics
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-green-200"
                >
                  View Dashboard Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Chart Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Your Trends (Last 30 Days)</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span className="text-sm text-gray-600">Mood</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">Energy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-sm text-gray-600">Stress</span>
                </div>
              </div>
            </div>

            {/* Simulated Chart */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 h-64 flex items-end justify-between gap-2">
              {[6, 5, 7, 8, 7, 6, 8, 9, 7, 8, 9, 8, 7, 9, 8, 7, 8, 9, 8, 7, 8, 9, 8, 9, 8, 7, 8, 9, 8, 9].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all hover:opacity-75"
                    style={{ height: `${value * 10}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Average Mood</p>
                <p className="text-2xl font-bold text-orange-600">7.8/10</p>
                <p className="text-xs text-green-600 font-semibold">↑ 15% this month</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Energy Level</p>
                <p className="text-2xl font-bold text-green-600">8.2/10</p>
                <p className="text-xs text-green-600 font-semibold">↑ 23% this month</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Stress Level</p>
                <p className="text-2xl font-bold text-purple-600">4.5/10</p>
                <p className="text-xs text-green-600 font-semibold">↓ 18% this month</p>
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
              Powerful Analytics Features
            </h2>
            <p className="text-xl text-gray-600">
              Transform your mood data into meaningful insights
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
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
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

      {/* Chart Types */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Track What Matters
            </h2>
            <p className="text-xl text-gray-600">
              Multiple metrics for a complete wellness picture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {chartTypes.map((chart, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border border-green-100"
              >
                <div className={`h-2 w-20 bg-${chart.color}-500 rounded-full mb-4`} style={{
                  background: chart.color === 'orange' ? '#f97316' : chart.color === 'green' ? '#22c55e' : '#a855f7'
                }} />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {chart.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {chart.description}
                </p>
                <div className={`bg-${chart.color}-50 rounded-lg p-3`} style={{
                  background: chart.color === 'orange' ? '#ffedd5' : chart.color === 'green' ? '#dcfce7' : '#f3e8ff'
                }}>
                  <p className="text-sm font-semibold" style={{
                    color: chart.color === 'orange' ? '#ea580c' : chart.color === 'green' ? '#16a34a' : '#9333ea'
                  }}>{chart.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Why Analytics Matter
            </h2>
            <p className="text-xl text-gray-600">
              Data-driven insights for better mental health decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden bg-white rounded-xl p-8 shadow-lg border border-green-100"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${insight.color} opacity-10 rounded-bl-full`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${insight.color} rounded-lg flex items-center justify-center mb-4`}>
                  <insight.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {insight.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {insight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BarChart3 className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See Your Progress in Action
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Start tracking today and watch your wellness journey unfold in beautiful charts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Tracking Free
                </motion.button>
              </Link>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-green-700/50 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
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

export default Analytics;

