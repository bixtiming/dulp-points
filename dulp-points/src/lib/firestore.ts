import { getFirestoreDb } from '@/lib/firebase-client'
import { collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, type DocumentReference, type Query, type QuerySnapshot, type DocumentData, limit } from 'firebase/firestore'
import type { User } from 'firebase/auth'
import type { UserProfile, WalletTransaction } from '@/types'

function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null
	const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'))
	return match ? decodeURIComponent(match[1]) : null
}

export function userDocRef(uid: string): DocumentReference<UserProfile> {
	return doc(getFirestoreDb(), 'users', uid) as DocumentReference<UserProfile>
}

export async function ensureUserProfile(user: User): Promise<void> {
	const ref = userDocRef(user.uid)
	const snap = await getDoc(ref)
	if (snap.exists()) return
	const referralCode = `DULP-${user.uid.slice(0, 6).toUpperCase()}`
	const referredByCode = getCookie('dp_ref')
	await setDoc(ref, {
		uid: user.uid,
		email: user.email ?? null,
		displayName: user.displayName ?? null,
		photoURL: user.photoURL ?? null,
		createdAt: serverTimestamp() as any,
		referralCode,
		referredByCode: referredByCode ?? null,
		balance: 0,
		lastActiveAt: serverTimestamp() as any,
	} satisfies UserProfile)
}

export function userTransactionsQuery(uid: string, pageSize = 25): Query<WalletTransaction> {
	return query(
		collection(getFirestoreDb(), 'transactions') as any,
		where('uid', '==', uid),
		orderBy('createdAt', 'desc'),
		limit(pageSize)
	) as unknown as Query<WalletTransaction>
}

export function referredUsersQuery(referralCode: string): Query<UserProfile> {
	return query(
		collection(getFirestoreDb(), 'users') as any,
		where('referredByCode', '==', referralCode)
	) as unknown as Query<UserProfile>
}