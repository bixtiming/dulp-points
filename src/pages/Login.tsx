import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { login, resetPassword, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

  // Clear auth errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setError('Please enter your email address');
      return;
    }

    try {
      setError('');
      setResetLoading(true);
      await resetPassword(resetEmail);
      setResetSent(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send password reset email');
    } finally {
      setResetLoading(false);
    }
  };

  const goBackToLogin = () => {
    setShowResetForm(false);
    setResetEmail('');
    setResetSent(false);
    setError('');
  };

  if (showResetForm) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-crypto-neon to-crypto-purple rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-white">D</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Reset Password
            </h2>
            <p className="text-gray-400">
              Enter your email to receive a password reset link
            </p>
          </motion.div>

          {!resetSent ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 space-y-6"
              onSubmit={handleResetPassword}
            >
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    autoComplete="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-neon focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
                >
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-crypto-neon to-crypto-purple hover:from-crypto-purple hover:to-crypto-neon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crypto-neon disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {resetLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={goBackToLogin}
                  className="text-crypto-neon hover:text-crypto-purple transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-green-400">Reset Link Sent!</h3>
              <p className="text-gray-300">
                We've sent a password reset link to <span className="text-crypto-neon">{resetEmail}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Check your email and click the link to reset your password. The link will expire in 1 hour.
              </p>
              <button
                onClick={goBackToLogin}
                className="btn-primary"
              >
                Back to Login
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-crypto-neon to-crypto-purple rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl font-bold text-white">D</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400">
            Sign in to your DulpPoints account
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-neon focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-12 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-neon focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {(error || authError) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
            >
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error || authError}</span>
            </motion.div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-crypto-neon to-crypto-purple hover:from-crypto-purple hover:to-crypto-neon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crypto-neon disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <button
              type="button"
              onClick={() => setShowResetForm(true)}
              className="text-crypto-neon hover:text-crypto-purple transition-colors duration-200 text-sm"
            >
              Forgot your password?
            </button>
            <Link
              to="/register"
              className="text-crypto-neon hover:text-crypto-purple transition-colors duration-200 text-sm"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </motion.form>

        {/* Decorative Elements */}
        <motion.div
          animate={{ float: 6 }}
          className="absolute top-20 left-10 w-16 h-16 bg-crypto-neon/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ float: 6, delay: 2 }}
          className="absolute bottom-20 right-10 w-20 h-20 bg-crypto-purple/20 rounded-full blur-xl"
        />
      </div>
    </div>
  );
};

export default Login;