import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc, collection, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

interface Transaction {
  id: string;
  type: 'earn' | 'spend' | 'referral' | 'bonus';
  amount: number;
  description: string;
  timestamp: Date;
  gameId?: string;
  referralId?: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => Promise<void>;
  updateBalance: (amount: number) => Promise<void>;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setBalance(0);
      setTransactions([]);
      setLoading(false);
      return;
    }

    // Listen to user's wallet data
    const userRef = doc(db, 'users', currentUser.uid);
    const unsubscribeUser = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setBalance(doc.data().points || 0);
      }
    });

    // Listen to user's transactions
    const transactionsRef = collection(db, 'users', currentUser.uid, 'transactions');
    const transactionsQuery = query(transactionsRef, orderBy('timestamp', 'desc'), limit(50));
    
    const unsubscribeTransactions = onSnapshot(transactionsQuery, (snapshot) => {
      const newTransactions: Transaction[] = [];
      snapshot.forEach((doc) => {
        newTransactions.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate()
        } as Transaction);
      });
      setTransactions(newTransactions);
      setLoading(false);
    });

    return () => {
      unsubscribeUser();
      unsubscribeTransactions();
    };
  }, [currentUser]);

  async function addTransaction(transaction: Omit<Transaction, 'id' | 'timestamp'>) {
    if (!currentUser) return;

    const transactionData = {
      ...transaction,
      timestamp: new Date()
    };

    const transactionsRef = collection(db, 'users', currentUser.uid, 'transactions');
    await addDoc(transactionsRef, transactionData);

    // Update user's balance
    const newBalance = balance + transaction.amount;
    await updateBalance(newBalance);
  }

  async function updateBalance(amount: number) {
    if (!currentUser) return;

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      points: amount
    });
  }

  const value = {
    balance,
    transactions,
    addTransaction,
    updateBalance,
    loading
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}