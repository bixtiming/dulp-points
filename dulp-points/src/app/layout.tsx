import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/components/Providers'
import UserMenu from '@/components/UserMenu'

export const metadata: Metadata = {
	title: 'DulpPoints',
	description: 'Crypto rewards and games platform',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="bg-black min-h-screen">
			<body className="text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900 via-black to-black">
				<div className="pointer-events-none fixed inset-0 bg-grid-glow bg-[length:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]"></div>
				<Providers>
					<div className="relative">
					<header className="sticky top-0 z-20 border-b border-primary-800/40 backdrop-blur bg-black/40">
						<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
							<div className="font-semibold tracking-wider text-primary-300">DulpPoints</div>
							<nav className="flex items-center gap-6 text-sm text-primary-100/80">
								<a href="/" className="hover:text-neon transition">Dashboard</a>
								<a href="/games" className="hover:text-neon transition">Games</a>
								<a href="/wallet" className="hover:text-neon transition">Wallet</a>
								<a href="/referrals" className="hover:text-neon transition">Referrals</a>
								<UserMenu />
							</nav>
						</div>
					</header>
					<main className="mx-auto max-w-6xl px-4 py-8">
						{children}
					</main>
					<footer className="border-t border-primary-800/40 bg-black/40">
						<div className="mx-auto max-w-6xl px-4 py-6 text-xs text-primary-200/60">© {new Date().getFullYear()} DulpPoints</div>
					</footer>
					</div>
				</Providers>
			</body>
		</html>
	)
}