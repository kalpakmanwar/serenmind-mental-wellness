import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Server, 
  Key,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileCheck,
  Award,
  UserX
} from "lucide-react";

const Security = () => {
  const features = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All your data is encrypted using industry-standard AES-256 encryption"
    },
    {
      icon: Key,
      title: "JWT Authentication",
      description: "Secure access and refresh tokens ensure only you can access your account"
    },
    {
      icon: EyeOff,
      title: "Private by Default",
      description: "Your mood data, journals, and chats are never shared with third parties"
    },
    {
      icon: Server,
      title: "Secure Storage",
      description: "Data stored in encrypted databases with regular security audits"
    },
    {
      icon: FileCheck,
      title: "GDPR Compliant",
      description: "Full compliance with data protection regulations and privacy laws"
    },
    {
      icon: UserX,
      title: "Data Deletion",
      description: "Delete your account and all associated data anytime with one click"
    }
  ];

  const securityPractices = [
    {
      title: "Password Security",
      points: [
        "Passwords hashed with BCrypt (never stored in plaintext)",
        "Minimum 8 characters with complexity requirements",
        "Account lockout after failed login attempts",
        "Secure password reset via email verification"
      ]
    },
    {
      title: "Data Privacy",
      points: [
        "No selling or sharing of personal data",
        "No advertising or third-party tracking",
        "Data export available anytime (JSON/PDF)",
        "Automatic data retention policies"
      ]
    },
    {
      title: "Access Control",
      points: [
        "Multi-factor authentication support",
        "Session management and auto-logout",
        "Role-based access controls",
        "Activity logging for security monitoring"
      ]
    },
    {
      title: "Infrastructure",
      points: [
        "HTTPS/TLS encryption for all connections",
        "Regular security patches and updates",
        "Automated backups and disaster recovery",
        "DDoS protection and rate limiting"
      ]
    }
  ];

  const privacy = [
    "🔒 Your mood entries are encrypted and only you can see them",
    "🔒 AI chat conversations are private and not used for training",
    "🔒 Journal entries are stored securely and never shared",
    "🔒 Reports generated locally - no data sent to third parties",
    "🔒 Email addresses never sold or used for marketing",
    "🔒 Full control over your data - export or delete anytime"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-teal-600/10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Military-Grade Security
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Private & Secure
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your data is encrypted and never shared. Your privacy is our priority. 
              Mental health is personal - it should stay that way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Create Secure Account
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-emerald-200"
                >
                  View Security Details
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Security Shield */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-emerald-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Bank-Level Security</h3>
              <p className="text-xl text-gray-600 max-w-2xl">
                We use the same encryption standards as banks and financial institutions to protect your mental health data.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8 w-full">
                <div className="bg-emerald-50 rounded-xl p-6">
                  <Lock className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="font-bold text-gray-800 mb-1">AES-256 Encryption</p>
                  <p className="text-sm text-gray-600">Military-grade security</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-6">
                  <Key className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="font-bold text-gray-800 mb-1">Secure Tokens</p>
                  <p className="text-sm text-gray-600">JWT authentication</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-6">
                  <FileCheck className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="font-bold text-gray-800 mb-1">GDPR Compliant</p>
                  <p className="text-sm text-gray-600">Full privacy protection</p>
                </div>
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
              Security Features
            </h2>
            <p className="text-xl text-gray-600">
              Multiple layers of protection for your peace of mind
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
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-4">
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

      {/* Security Practices */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Our Security Practices
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive security at every level
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityPractices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border border-emerald-100"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  {practice.title}
                </h3>
                <ul className="space-y-3">
                  {practice.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Guarantees */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl"
            >
              <Eye className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Your Data, Your Control</h3>
              <p className="text-xl mb-6 text-emerald-100">
                We believe your mental health data belongs to YOU and nobody else.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">Export Anytime</p>
                  <p className="text-emerald-100">Download all your data in JSON or PDF format</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">Delete Anytime</p>
                  <p className="text-emerald-100">Permanently remove all data with one click</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-lg mb-1">No Ads or Tracking</p>
                  <p className="text-emerald-100">We never sell your data or show ads</p>
                </div>
              </div>

              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Join Securely
                  <Shield className="w-5 h-5" />
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
                Privacy Guarantees
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                What We Promise
              </h2>

              <div className="space-y-4">
                {privacy.map((promise, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-emerald-50 rounded-lg p-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{promise}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Privacy is Non-Negotiable
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Start your mental wellness journey with complete peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Securely
                </motion.button>
              </Link>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-emerald-700/50 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
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

export default Security;

