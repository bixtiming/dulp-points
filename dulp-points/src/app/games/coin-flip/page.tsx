"use client"

import { useState } from 'react'

export default function CoinFlipPage() {
	const [result, setResult] = useState<string | null>(null)
	const [isFlipping, setIsFlipping] = useState(false)

	function flip() {
		setIsFlipping(true)
		setResult(null)
		setTimeout(() => {
			const r = Math.random() < 0.5 ? 'Heads' : 'Tails'
			setResult(r)
			setIsFlipping(false)
		}, 600)
	}

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Coin Flip</h1>
			<div className="rounded-xl border border-primary-800/50 bg-black/40 p-6">
				<div className="h-24 flex items-center justify-center text-3xl font-bold">
					{isFlipping ? <span className="animate-pulse text-neon">Flipping...</span> : result ?? '—'}
				</div>
				<div className="mt-4 flex justify-center">
					<button onClick={flip} className="rounded-md bg-primary-600 hover:bg-primary-500 transition px-6 py-2 text-sm" disabled={isFlipping}>
						Flip
					</button>
				</div>
			</div>
		</div>
	)
}