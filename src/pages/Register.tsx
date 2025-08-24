import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const { register, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

  // Check for referral code in URL
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralCode(ref);
    }
  }, [searchParams]);

  // Clear auth errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Check username availability
  useEffect(() => {
    const checkUsername = async () => {
      if (username.length >= 3) {
        setCheckingUsername(true);
        // Simulate username check (in real app, this would call an API)
        setTimeout(() => {
          setUsernameAvailable(username !== 'admin' && username !== 'test');
          setCheckingUsername(false);
        }, 500);
      } else {
        setUsernameAvailable(null);
      }
    };

    const timeoutId = setTimeout(checkUsername, 300);
    return () => clearTimeout(timeoutId);
  }, [username]);

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }

    if (username.length > 20) {
      setError('Username must be less than 20 characters');
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return false;
    }

    if (usernameAvailable === false) {
      setError('Username is already taken');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (referralCode && referralCode.length !== 6) {
      setError('Referral code must be 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setError('');
      setLoading(true);
      await register(email, password, username, referralCode || undefined);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const getUsernameStatus = () => {
    if (checkingUsername) {
      return { icon: '⏳', text: 'Checking...', color: 'text-yellow-400' };
    }
    if (usernameAvailable === true) {
      return { icon: '✅', text: 'Available', color: 'text-green-400' };
    }
    if (usernameAvailable === false) {
      return { icon: '❌', text: 'Taken', color: 'text-red-400' };
    }
    return null;
  };

  const usernameStatus = getUsernameStatus();

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
            Join DulpPoints
          </h2>
          <p className="text-gray-400">
            Start your crypto rewards journey today
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
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-neon focus:border-transparent transition-all duration-200"
                  placeholder="Choose a username"
                />
                {usernameStatus && (
                  <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${usernameStatus.color}`}>
                    {usernameStatus.icon} {usernameStatus.text}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Username must be 3-20 characters, letters, numbers, and underscores only
              </p>
            </div>

            {/* Email Field */}
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

            {/* Referral Code Field */}
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-gray-300 mb-2">
                Referral Code <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Gift className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-neon focus:border-transparent transition-all duration-200"
                  placeholder="Enter referral code (6 characters)"
                  maxLength={6}
                />
              </div>
              {referralCode && (
                <p className="text-xs text-crypto-neon mt-1">
                  You'll get bonus points for using a referral code!
                </p>
              )}
            </div>

            {/* Password Field */}
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-12 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-neon focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
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
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-12 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-neon focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading || usernameAvailable === false || checkingUsername}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-crypto-neon to-crypto-purple hover:from-crypto-purple hover:to-crypto-neon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crypto-neon disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-crypto-neon hover:text-crypto-purple transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
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

export default Register;