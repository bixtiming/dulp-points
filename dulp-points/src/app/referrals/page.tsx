import AuthGate from '@/components/AuthGate'

export default function ReferralsPage() {
	return (
		<AuthGate>
			<div className="space-y-6">
				<h1 className="text-2xl font-semibold">Referrals</h1>
				<div className="rounded-xl border border-primary-800/50 bg-black/40 p-6">
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
						<div>
							<div className="text-sm text-primary-200/70">Your Code</div>
							<div className="text-2xl font-bold tracking-wider">DULP-XXXX</div>
						</div>
						<button className="rounded-md bg-primary-600 hover:bg-primary-500 transition px-4 py-2 text-sm">Copy</button>
					</div>
				</div>
				<div className="rounded-xl border border-primary-800/50 bg-black/40">
					<div className="p-4 border-b border-primary-800/40 text-sm text-primary-200/70">Referral Stats</div>
					<div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div>
							<div className="text-sm text-primary-200/70">Signups</div>
							<div className="text-2xl font-bold">0</div>
						</div>
						<div>
							<div className="text-sm text-primary-200/70">Active</div>
							<div className="text-2xl font-bold">0</div>
						</div>
						<div>
							<div className="text-sm text-primary-200/70">Earnings</div>
							<div className="text-2xl font-bold text-neon">0.0000 DP</div>
						</div>
					</div>
				</div>
			</div>
		</AuthGate>
	)
}