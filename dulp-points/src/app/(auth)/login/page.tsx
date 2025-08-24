"use client"

import { getFirebaseAuthInstance, getGoogleProvider } from '@/lib/firebase-client'
import { signInWithPopup } from 'firebase/auth'

export default function LoginPage() {
	async function handleGoogle() {
		const auth = getFirebaseAuthInstance()
		const provider = getGoogleProvider()
		await signInWithPopup(auth, provider)
	}

	return (
		<div className="max-w-md mx-auto space-y-6">
			<h1 className="text-2xl font-semibold">Login</h1>
			<button onClick={handleGoogle} className="w-full rounded-md bg-primary-600 hover:bg-primary-500 transition px-4 py-2 text-sm">
				Continue with Google
			</button>
		</div>
	)
}