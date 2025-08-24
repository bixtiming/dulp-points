"use client"

import { useState } from 'react'

export default function DicePage() {
	const [roll, setRoll] = useState<number | null>(null)
	const [isRolling, setIsRolling] = useState(false)

	function rollDice() {
		setIsRolling(true)
		setRoll(null)
		setTimeout(() => {
			const r = Math.floor(Math.random() * 6) + 1
			setRoll(r)
			setIsRolling(false)
		}, 600)
	}

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Dice Roll</h1>
			<div className="rounded-xl border border-primary-800/50 bg-black/40 p-6">
				<div className="h-24 flex items-center justify-center text-3xl font-bold">
					{isRolling ? <span className="animate-pulse text-neon">Rolling...</span> : roll ?? '—'}
				</div>
				<div className="mt-4 flex justify-center">
					<button onClick={rollDice} className="rounded-md bg-primary-600 hover:bg-primary-500 transition px-6 py-2 text-sm" disabled={isRolling}>
						Roll
					</button>
				</div>
			</div>
		</div>
	)
}