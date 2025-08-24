"use client"

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function AuthGate({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth()
	if (loading) return <div className="text-primary-200/70">Loading...</div>
	if (!user) {
		return (
			<div className="rounded-xl border border-primary-800/50 bg-black/40 p-6">
				<div className="text-primary-100/80">You must be logged in to view this page.</div>
				<Link href="/login" className="inline-block mt-4 rounded-md bg-primary-600 hover:bg-primary-500 transition px-4 py-2 text-sm">Login</Link>
			</div>
		)
	}
	return <>{children}</>
}