import { cleanup, render, screen } from '@testing-library/react'
import { redirect } from 'next/navigation'
import AdminDashboard from './page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

// Mock auth
vi.mock('../../auth', () => ({
  auth: vi.fn().mockResolvedValue(null),
}))

// Mock Prisma so it doesn't read DATABASE_URL
vi.mock('../../lib/prisma', () => ({
  prisma: {
    post: {
      findMany: vi.fn().mockResolvedValue([]),
    },
  },
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('Admin Security', () => {
  it('redirects to login if the user is not authenticated', async () => {
    // for now null is treated as not authenticated
    // this is a placeholder for the logic
    await AdminDashboard()

    expect(redirect).toHaveBeenCalledWith('/login')
  })
})
