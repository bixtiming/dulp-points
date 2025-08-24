"use client"

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { getFirebaseAuthInstance } from '@/lib/firebase-client'

export default function UserMenu() {
	const { user, loading } = useAuth()
	if (loading) return <div className="text-xs text-primary-200/60">...</div>
	if (!user) return <Link href="/login" className="text-sm text-primary-100/80 hover:text-neon transition">Login</Link>
	return (
		<div className="flex items-center gap-3">
			<div className="text-sm text-primary-100/80">{user.displayName ?? user.email}</div>
			<button
				onClick={() => signOut(getFirebaseAuthInstance())}
				className="text-xs rounded-md border border-primary-800/50 px-2 py-1 hover:bg-black/40"
			>
				Logout
			</button>
		</div>
	)
}