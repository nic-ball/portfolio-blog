export { auth as middleware } from './auth'

// Only protect paths starting with /admin
export const config = {
  matcher: ['/admin/:path*']
}
