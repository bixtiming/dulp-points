import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { RewardsProvider } from './contexts/RewardsContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Referrals from './pages/Referrals';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <RewardsProvider>
            <div className="App min-h-screen bg-crypto-dark">
              <Navbar />
              <main className="pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/games" 
                    element={
                      <ProtectedRoute>
                        <Games />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/referrals" 
                    element={
                      <ProtectedRoute>
                        <Referrals />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/wallet" 
                    element={
                      <ProtectedRoute>
                        <Wallet />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
            </div>
          </RewardsProvider>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;