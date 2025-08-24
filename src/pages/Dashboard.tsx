import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Zap, 
  TrendingUp, 
  Gamepad2, 
  Users, 
  Wallet, 
  Star,
  ArrowUpRight,
  Calendar,
  Target,
  User,
  Edit,
  Crown,
  TrendingDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { useRewards } from '../contexts/RewardsContext';

const Dashboard: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const { balance, transactions } = useWallet();
  const { level, experience, experienceToNext, gameStats } = useRewards();
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const progressPercentage = (experience / experienceToNext) * 100;

  const recentTransactions = transactions.slice(0, 5);

  const quickActions = [
    {
      title: 'Play Games',
      description: 'Earn points by playing',
      icon: Gamepad2,
      color: 'from-crypto-purple to-purple-500',
      link: '/games'
    },
    {
      title: 'Invite Friends',
      description: 'Earn referral bonuses',
      icon: Users,
      color: 'from-crypto-neon to-green-500',
      link: '/referrals'
    },
    {
      title: 'View Wallet',
      description: 'Check your balance',
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
      link: '/wallet'
    }
  ];

  const getLevelBadge = (level: number) => {
    if (level >= 50) return { name: 'Legend', color: 'from-purple-600 to-pink-600', icon: '👑' };
    if (level >= 30) return { name: 'Master', color: 'from-red-500 to-pink-500', icon: '🔥' };
    if (level >= 20) return { name: 'Expert', color: 'from-blue-500 to-purple-500', icon: '⭐' };
    if (level >= 10) return { name: 'Advanced', color: 'from-green-500 to-blue-500', icon: '🚀' };
    if (level >= 5) return { name: 'Intermediate', color: 'from-yellow-500 to-green-500', icon: '⚡' };
    return { name: 'Beginner', color: 'from-gray-500 to-blue-500', icon: '🌱' };
  };

  const levelBadge = getLevelBadge(level);

  const getReferralTier = (referralsCount: number) => {
    if (referralsCount >= 31) return { name: 'Diamond', color: 'from-purple-500 to-blue-400', bonus: '25%' };
    if (referralsCount >= 16) return { name: 'Gold', color: 'from-crypto-gold to-yellow-400', bonus: '20%' };
    if (referralsCount >= 6) return { name: 'Silver', color: 'from-crypto-silver to-gray-400', bonus: '15%' };
    if (referralsCount >= 1) return { name: 'Bronze', color: 'from-crypto-bronze to-yellow-600', bonus: '10%' };
    return { name: 'None', color: 'from-gray-500 to-gray-400', bonus: '0%' };
  };

  const referralTier = getReferralTier(userProfile?.referralsCount || 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome back, {userProfile?.username || currentUser?.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-gray-400">
                Here's what's happening with your DulpPoints account
              </p>
            </div>
            
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 lg:mt-0"
            >
              <div className="card p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-crypto-neon to-crypto-purple rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{userProfile?.username}</h3>
                    <p className="text-gray-400 text-sm">{userProfile?.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${levelBadge.color} text-white`}>
                        {levelBadge.icon} {levelBadge.name}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${referralTier.color} text-white`}>
                        {referralTier.name} Tier
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProfileEdit(true)}
                    className="p-2 text-gray-400 hover:text-crypto-neon transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card neon-glow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Balance</p>
                <p className="text-3xl font-bold text-crypto-neon">
                  {balance.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm">DulpPoints</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-crypto-neon to-green-400 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Level Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Level</p>
                <p className="text-3xl font-bold text-crypto-gold">
                  {level}
                </p>
                <p className="text-gray-400 text-sm">{levelBadge.name}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-crypto-gold to-yellow-400 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Games Played Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Games Played</p>
                <p className="text-3xl font-bold text-crypto-purple">
                  {gameStats.gamesPlayed}
                </p>
                <p className="text-gray-400 text-sm">Total Games</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-crypto-purple to-purple-400 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Referrals Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Referrals</p>
                <p className="text-3xl font-bold text-crypto-neon">
                  {userProfile?.referralsCount || 0}
                </p>
                <p className="text-gray-400 text-sm">{referralTier.bonus} Bonus</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-crypto-neon to-green-400 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="card"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-crypto-gold" />
                Level Progress
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Level {level}</span>
                  <span>{experience} / {experienceToNext} XP</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="bg-gradient-to-r from-crypto-gold to-yellow-400 h-3 rounded-full transition-all duration-300"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {experienceToNext - experience} XP needed for next level
              </p>
              
              {/* Level Rewards Preview */}
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-white mb-2">Next Level Rewards:</h4>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-crypto-neon">+{(level + 1) * 50} Points</span>
                  <span className="text-crypto-gold">+{(level + 1) * 10} XP</span>
                  {level + 1 === 5 && <span className="text-crypto-purple">🎯 New Badge</span>}
                  {level + 1 === 10 && <span className="text-crypto-purple">🚀 Advanced Games</span>}
                  {level + 1 === 20 && <span className="text-crypto-purple">👑 Expert Status</span>}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="card"
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={action.title}
                    href={action.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="group p-4 rounded-lg border border-gray-600 hover:border-crypto-neon transition-all duration-300 hover:scale-105"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-1">{action.title}</h4>
                    <p className="text-gray-400 text-sm">{action.description}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-crypto-purple" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'earn' ? 'bg-green-500/20' :
                        transaction.type === 'spend' ? 'bg-red-500/20' :
                        transaction.type === 'referral' ? 'bg-blue-500/20' :
                        'bg-yellow-500/20'
                      }`}>
                        {transaction.type === 'earn' && <TrendingUp className="w-4 h-4 text-green-400" />}
                        {transaction.type === 'spend' && <TrendingDown className="w-4 h-4 text-red-400" />}
                        {transaction.type === 'referral' && <Users className="w-4 h-4 text-blue-400" />}
                        {transaction.type === 'bonus' && <Star className="w-4 h-4 text-yellow-400" />}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{transaction.description}</p>
                        <p className="text-gray-400 text-xs">
                          {transaction.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${
                      transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400">No recent activity</p>
                  <p className="text-gray-500 text-sm">Start playing games to see your activity here</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;