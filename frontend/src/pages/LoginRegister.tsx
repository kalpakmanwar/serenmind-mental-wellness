import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { BlobPeach, BlobSage, FloralDecor } from '@/assets/svg';
import { isValidEmail, isValidPassword } from '@/utils/helpers';

// =========================================
// Login/Register Page (Two-Column Canva Style)
// =========================================

const LoginRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const isLoginMode = location.pathname === '/login';
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  // Validation errors
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors = { email: '', username: '', password: '' };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!isLoginMode && !formData.username) {
      newErrors.username = 'Full name is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!isLoginMode && !isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      if (isLoginMode) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        navigate('/dashboard');
      } else {
        await register({
          fullName: formData.username,
          email: formData.email,
          password: formData.password,
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        email: error?.message || 'Authentication failed. Please try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLoginMode ? 'Login' : 'Register'} - SerenMind by Kalpak Manwar</title>
        <meta 
          name="description" 
          content="Join SerenMind - Your mental wellness companion. Track mood, journal thoughts, and get AI-powered insights. Developed by Kalpak Manwar." 
        />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
        {/* Background Blobs */}
        <div className="absolute top-10 left-10 opacity-30">
          <BlobPeach className="w-64 h-64" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-30">
          <BlobSage className="w-64 h-64" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Card */}
          <div className="card">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl" aria-hidden="true">
                  🌟
                </span>
              </div>
              <h1 className="text-3xl font-heading font-bold text-text-dark dark:text-white mb-2">
                {isLoginMode ? 'Welcome Back' : 'Join SerenMind'}
              </h1>
              <p className="text-text-gray dark:text-gray-400">
                {isLoginMode
                  ? 'Continue your wellness journey'
                  : 'Start your mental wellness journey today'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-gray" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Full Name (Register only) */}
              {!isLoginMode && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-gray" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`input pl-10 ${errors.username ? 'border-red-500' : ''}`}
                      placeholder="Enter your full name"
                      required={!isLoginMode}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-gray" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-gray hover:text-text-dark dark:hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {isLoginMode ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    {isLoginMode ? 'Login' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Login/Register */}
            <div className="mt-6 text-center text-sm text-text-gray dark:text-gray-400">
              {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
              <Link
                to={isLoginMode ? '/register' : '/login'}
                className="text-accent-peach hover:underline font-medium"
              >
                {isLoginMode ? 'Sign up' : 'Log in'}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginRegister;
