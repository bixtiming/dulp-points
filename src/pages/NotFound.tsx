import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Gamepad2, Users, Wallet, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const quickLinks = [
    { name: 'Home', path: '/', icon: Home, color: 'from-crypto-neon to-green-400' },
    { name: 'Games', path: '/games', icon: Gamepad2, color: 'from-crypto-purple to-purple-400' },
    { name: 'Referrals', path: '/referrals', icon: Users, color: 'from-crypto-gold to-yellow-400' },
    { name: 'Wallet', path: '/wallet', icon: Wallet, color: 'from-blue-500 to-blue-400' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-8xl font-bold text-crypto-neon mb-4">404</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="block p-4 rounded-lg border border-gray-600 hover:border-crypto-neon transition-all duration-300 hover:scale-105 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">{link.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

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

export default NotFound;