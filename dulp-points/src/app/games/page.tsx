export default function GamesPage() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Games</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<a href="/games/coin-flip" className="rounded-xl border border-primary-800/50 bg-black/40 p-6 hover:bg-black/60 transition">
					<div className="text-lg font-medium">Coin Flip</div>
					<div className="text-primary-200/70">50/50 fair outcome. Win rewards instantly.</div>
				</a>
				<a href="/games/dice" className="rounded-xl border border-primary-800/50 bg-black/40 p-6 hover:bg-black/60 transition">
					<div className="text-lg font-medium">Dice Roll</div>
					<div className="text-primary-200/70">Pick high/low and roll the chain-powered dice.</div>
				</a>
			</div>
		</div>
	)
}