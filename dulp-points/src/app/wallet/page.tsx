import AuthGate from '@/components/AuthGate'

export default function WalletPage() {
	return (
		<AuthGate>
			<div className="space-y-6">
				<h1 className="text-2xl font-semibold">Wallet</h1>
				<div className="rounded-xl border border-primary-800/50 bg-black/40 p-6">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm text-primary-200/70">Balance</div>
							<div className="text-3xl font-bold text-neon">0.0000 DP</div>
						</div>
						<button className="rounded-md bg-primary-600 hover:bg-primary-500 transition px-4 py-2 text-sm">Withdraw</button>
					</div>
				</div>
				<div className="rounded-xl border border-primary-800/50 bg-black/40">
					<div className="p-4 border-b border-primary-800/40 text-sm text-primary-200/70">Recent Transactions</div>
					<div className="p-4 text-sm text-primary-100/80">No transactions yet.</div>
				</div>
			</div>
		</AuthGate>
	)
}