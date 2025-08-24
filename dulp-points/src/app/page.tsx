export default function Page() {
	return (
		<div className="space-y-8">
			<section className="rounded-xl border border-primary-800/50 bg-black/40 p-6 shadow-glow">
				<h1 className="text-2xl font-semibold tracking-tight">Welcome to DulpPoints</h1>
				<p className="mt-2 text-primary-100/80">Play fair mini-games, earn rewards, and grow with referrals.</p>
			</section>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="rounded-xl border border-primary-800/50 bg-black/40 p-4">
					<div className="text-sm text-primary-200/70">Balance</div>
					<div className="mt-2 text-3xl font-bold text-neon">0.0000 DP</div>
				</div>
				<div className="rounded-xl border border-primary-800/50 bg-black/40 p-4">
					<div className="text-sm text-primary-200/70">Referral Level</div>
					<div className="mt-2 text-3xl font-bold text-cyber">Bronze</div>
				</div>
				<div className="rounded-xl border border-primary-800/50 bg-black/40 p-4">
					<div className="text-sm text-primary-200/70">Streak</div>
					<div className="mt-2 text-3xl font-bold">0</div>
				</div>
			</div>
			<section className="rounded-xl border border-primary-800/50 bg-black/40 p-6">
				<h2 className="text-xl font-semibold">Quick Actions</h2>
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
					<a href="/games" className="rounded-lg border border-primary-800/50 bg-primary-900/20 hover:bg-primary-900/30 transition p-4">Play Games</a>
					<a href="/wallet" className="rounded-lg border border-primary-800/50 bg-primary-900/20 hover:bg-primary-900/30 transition p-4">View Wallet</a>
					<a href="/referrals" className="rounded-lg border border-primary-800/50 bg-primary-900/20 hover:bg-primary-900/30 transition p-4">Referrals</a>
				</div>
			</section>
		</div>
	)
}