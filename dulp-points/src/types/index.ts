export type UserProfile = {
	uid: string
	email: string | null
	displayName: string | null
	photoURL: string | null
	createdAt: any
	referralCode: string
	referredByCode?: string | null
	balance: number
	streak?: number
	lastActiveAt?: any
}

export type WalletTransactionType =
	| 'game_win'
	| 'game_loss'
	| 'bonus'
	| 'referral_bonus'
	| 'withdrawal'
	| 'deposit'

export type WalletTransaction = {
	id?: string
	uid: string
	amount: number
	type: WalletTransactionType
	game?: 'coin_flip' | 'dice'
	metadata?: Record<string, any>
	createdAt: any
}

export type CoinFlipResult = {
	result: 'Heads' | 'Tails'
}

export type DiceRollResult = {
	roll: number
}