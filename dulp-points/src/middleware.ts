import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const url = req.nextUrl
	const ref = url.searchParams.get('ref')
	const res = NextResponse.next()
	if (ref) {
		res.cookies.set('dp_ref', ref, { path: '/', maxAge: 60 * 60 * 24 * 30 })
	}
	return res
}

export const config = {
	matcher: [
		'/wallet',
		'/games/:path*',
		'/referrals'
	]
}