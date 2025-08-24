import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface UserProfile {
  username: string;
  email: string;
  createdAt: Date;
  points: number;
  level: number;
  referralCode: string;
  referredBy: string | null;
  totalEarnings: number;
  gamesPlayed: number;
  referralsCount: number;
  lastLoginAt: Date;
  profilePicture?: string;
  bio?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string, referralCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function register(email: string, password: string, username: string, referralCode?: string) {
    try {
      setError(null);
      setLoading(true);

      // Check if username is already taken
      const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
      const usernameSnapshot = await getDocs(usernameQuery);
      
      if (!usernameSnapshot.empty) {
        throw new Error('Username is already taken. Please choose a different one.');
      }

      // Check if referral code is valid
      let referredBy = null;
      if (referralCode) {
        const referralQuery = query(collection(db, 'users'), where('referralCode', '==', referralCode));
        const referralSnapshot = await getDocs(referralQuery);
        
        if (referralSnapshot.empty) {
          throw new Error('Invalid referral code. Please check and try again.');
        }
        
        referredBy = referralSnapshot.docs[0].id;
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(result.user, {
        displayName: username
      });

      // Create user profile in Firestore
      const userProfileData: UserProfile = {
        username,
        email,
        createdAt: new Date(),
        points: 100, // Starting bonus
        level: 1,
        referralCode: generateReferralCode(),
        referredBy,
        totalEarnings: 100,
        gamesPlayed: 0,
        referralsCount: 0,
        lastLoginAt: new Date(),
        bio: 'Welcome to DulpPoints!'
      };

      await setDoc(doc(db, 'users', result.user.uid), userProfileData);

      // If user was referred, update referrer's stats
      if (referredBy) {
        const referrerRef = doc(db, 'users', referredBy);
        const referrerDoc = await getDoc(referrerRef);
        
        if (referrerDoc.exists()) {
          const referrerData = referrerDoc.data();
          const referralBonus = 50; // Bonus for successful referral
          
          await updateDoc(referrerRef, {
            referralsCount: (referrerData.referralsCount || 0) + 1,
            points: (referrerData.points || 0) + referralBonus,
            totalEarnings: (referrerData.totalEarnings || 0) + referralBonus
          });

          // Add referral transaction for referrer
          await addDoc(collection(db, 'users', referredBy, 'transactions'), {
            type: 'referral',
            amount: referralBonus,
            description: `Referral bonus for ${username}`,
            timestamp: new Date(),
            referralId: result.user.uid
          });
        }
      }

      setUserProfile(userProfileData);
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function generateReferralCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async function login(email: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      if (result.user) {
        await updateDoc(doc(db, 'users', result.user.uid), {
          lastLoginAt: new Date()
        });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to log in');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setError(null);
      await signOut(auth);
      setUserProfile(null);
    } catch (error: any) {
      setError(error.message || 'Failed to log out');
      throw error;
    }
  }

  async function updateUserProfile(updates: Partial<UserProfile>) {
    if (!currentUser) return;

    try {
      setError(null);
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, updates);
      
      // Update local state
      if (userProfile) {
        setUserProfile({ ...userProfile, ...updates });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
      throw error;
    }
  }

  async function resetPassword(email: string) {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setError(error.message || 'Failed to send password reset email');
      throw error;
    }
  }

  function clearError() {
    setError(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Load user profile
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const profileData = userDoc.data() as UserProfile;
            setUserProfile(profileData);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    register,
    logout,
    updateUserProfile,
    resetPassword,
    loading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}