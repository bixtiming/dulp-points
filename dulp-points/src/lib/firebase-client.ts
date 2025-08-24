import { initializeApp, type FirebaseApp, getApps } from 'firebase/app'
import { getAuth, type Auth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getFunctions, type Functions } from 'firebase/functions'
import { getFirebaseClientConfig } from './env'

let firebaseApp: FirebaseApp | null = null

export function getFirebaseApp(): FirebaseApp {
	if (firebaseApp) return firebaseApp
	if (!getApps().length) {
		firebaseApp = initializeApp(getFirebaseClientConfig())
	} else {
		firebaseApp = getApps()[0]!
	}
	return firebaseApp
}

export function getFirebaseAuthInstance(): Auth {
	return getAuth(getFirebaseApp())
}

export function getGoogleProvider() {
	return new GoogleAuthProvider()
}

export function getFirestoreDb(): Firestore {
	return getFirestore(getFirebaseApp())
}

export function getCloudFunctions(): Functions {
	return getFunctions(getFirebaseApp())
}