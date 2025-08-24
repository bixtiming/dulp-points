"use client"

import { onAuthStateChanged, type User } from 'firebase/auth'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getFirebaseAuthInstance } from '@/lib/firebase-client'

export type AuthContextValue = {
	user: User | null
	loading: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const auth = getFirebaseAuthInstance()
		const unsub = onAuthStateChanged(auth, async (u) => {
			setUser(u)
			setLoading(false)
			if (u) {
				const { ensureUserProfile } = await import('@/lib/firestore')
				ensureUserProfile(u).catch(() => {})
			}
		})
		return () => unsub()
	}, [])

	const value = useMemo(() => ({ user, loading }), [user, loading])
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
	return ctx
}